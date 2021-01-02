import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateOrderService from '../services/CreateOrderService';

const ordersRouter = Router();

ordersRouter.get('/', (request, response) => {
    return response.json({ message: 'Get working' });
});

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

export default ordersRouter;
