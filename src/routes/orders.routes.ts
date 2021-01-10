import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateOrderService from '../services/CreateOrderService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ListOrderMorningAvailabilityService from '../services/ListOrderMorningAvailabilityService';

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

ordersRouter.get('/morning-availability', async (request, response) => {
    try {
        const { year, month, day } = request.query;

        const listOrderDayAvailability = new ListOrderMorningAvailabilityService();

        const orders = await listOrderDayAvailability.execute({
            year: Number(year),
            month: Number(month),
            day: Number(day),
        });

        return response.json(orders);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default ordersRouter;
