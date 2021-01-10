import { getRepository } from 'typeorm';

import Food from '../models/Food';

interface Request {
    food_id: string;
    quantity: number;
}

class AddFoodQuantityService {
    public async execute({ food_id, quantity }: Request): Promise<Food> {
        const foodsRepository = getRepository(Food);

        const checkFoodExists = await foodsRepository.findOne(food_id);

        if (!checkFoodExists) {
            throw new Error('This food id does not exists');
        }

        checkFoodExists.quantity += quantity;

        const food = await foodsRepository.save(checkFoodExists);

        return food;
    }
}

export default AddFoodQuantityService;
