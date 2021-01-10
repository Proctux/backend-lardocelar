import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import CreateFoodService from '../services/CreateFoodService';
import Food from '../models/Food';
import UpdateFoodImageService from '../services/UpdateFoodImageService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import AddFoodQuantityService from '../services/AddFoodQuantityService';
import RemoveFoodQuantityService from '../services/RemoveFoodQuantityService';

const foodsRouter = Router();
const upload = multer(uploadConfig);
foodsRouter.use(ensureAuthenticated);

foodsRouter.get('/', async (request, response) => {
    const foodsRepository = getRepository(Food);

    const foods = await foodsRepository.find();

    return response.json(foods);
});

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

foodsRouter.patch(
    '/image',
    ensureAuthenticated,
    upload.single('image'),
    async (request, response) => {
        try {
            const { food_id } = request.body;

            const updateFoodImage = new UpdateFoodImageService();

            const food = await updateFoodImage.execute({
                food_id,
                filename: request.file.filename,
            });

            return response.json(food);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

foodsRouter.patch('/add_stock', async (request, response) => {
    try {
        const { food_id, quantity } = request.body;

        const addFoodQuantity = new AddFoodQuantityService();

        const food = await addFoodQuantity.execute({ food_id, quantity });

        return response.json(food);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

foodsRouter.patch('/remove_stock', async (request, response) => {
    try {
        const { food_id, quantity } = request.body;

        const removeFoodQuantity = new RemoveFoodQuantityService();

        const food = await removeFoodQuantity.execute({ food_id, quantity });

        return response.json(food);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default foodsRouter;
