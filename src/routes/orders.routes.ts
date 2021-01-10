import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateOrderService from '../services/CreateOrderService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ListOrderBreakFastAvailabilityService from '../services/ListOrderBreakFastAvailabilityService';
import ListOrderLunchAvailabilityService from '../services/ListOrderLunchAvailabilityService';
import ListOrderDinnerAvailabilityService from '../services/ListOrderDinnerAvailabilityService';

const ordersRouter = Router();
ordersRouter.use(ensureAuthenticated);

ordersRouter.post('/', async (request, response) => {
    try {
        const { quantity, date, comments, food_id, user_id } = request.body;

        const parsedDate = parseISO(date);

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({
            quantity,
            date: parsedDate,
            comments,
            food_id,
            user_id,
        });

        return response.json(order);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

ordersRouter.get('/breakfast-availability', async (request, response) => {
    try {
        const { year, month, day } = request.query;

        const listOrderBreakFastAvailability = new ListOrderBreakFastAvailabilityService();

        const orders = await listOrderBreakFastAvailability.execute({
            year: Number(year),
            month: Number(month),
            day: Number(day),
        });

        return response.json(orders);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

ordersRouter.get('/lunch-availability', async (request, response) => {
    try {
        const { day, month, year } = request.query;

        const listOrderLunchAvailability = new ListOrderLunchAvailabilityService();

        const orders = await listOrderLunchAvailability.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(orders);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

ordersRouter.get('/dinner-availability', async (request, response) => {
    try {
        const { day, month, year } = request.query;

        const listOrderDinnerAvailability = new ListOrderDinnerAvailabilityService();

        const orders = await listOrderDinnerAvailability.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(orders);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default ordersRouter;
