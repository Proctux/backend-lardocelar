import { getRepository } from 'typeorm';

import Food from '../models/Food';

interface Request {
    food_id: string;
    quantity: number;
}

class RemoveFoodQuantityService {
    public async execute({ food_id, quantity }: Request): Promise<Food> {
        const foodsRepository = getRepository(Food);

        if (quantity <= 0) {
            throw new Error('Cannot remove quantity lower or equal zero');
        }

        const checkFoodExists = await foodsRepository.findOne(food_id);

        if (!checkFoodExists) {
            throw new Error('This food id does not exists');
        }

        if (checkFoodExists.quantity < quantity) {
            throw new Error('There is not stock enough');
        }

        checkFoodExists.quantity -= quantity;

        const food = await foodsRepository.save(checkFoodExists);

        return food;
    }
}

export default RemoveFoodQuantityService;
