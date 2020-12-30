import { Router } from 'express';

const ordersRouter = Router();

ordersRouter.get('/', (request, response) => {
    return response.json({ message: 'Get working' });
});

ordersRouter.post('/', (request, response) => {
    return response.json({ message: 'Post working' });
});

export default ordersRouter;
