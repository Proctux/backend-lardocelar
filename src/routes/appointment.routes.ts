import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request, response) => {
    return response.json({ message: 'Get working' });
});

appointmentsRouter.post('/', (request, response) => {
    return response.json({ message: 'Post working' });
});

export default appointmentsRouter;
