import { Router } from 'express';

import CreateFoodService from '../services/CreateFoodService';

const foodsRouter = Router();

foodsRouter.post('/', async (request, response) => {
    try {
        const { name, price, type, description } = request.body;

        const createFood = new CreateFoodService();

        const food = await createFood.execute({
            name,
            price,
            type,
            description,
        });

        return response.json(food);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default foodsRouter;
