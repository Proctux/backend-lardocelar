import { getRepository } from 'typeorm';

import Food from '../models/Food';

interface Request {
    name: string;
    price: number;
    type: string;
    description: string;
}

class CreateFoodService {
    public async execute({
        name,
        price,
        type,
        description,
    }: Request): Promise<Food> {
        const foodsRepository = getRepository(Food);

        const checkFoodExists = await foodsRepository.findOne({
            where: { name },
        });

        if (checkFoodExists) {
            throw new Error('This food is already registered');
        }

        const food = foodsRepository.create({
            name,
            price,
            type,
            description,
        });

        await foodsRepository.save(food);

        return food;
    }
}

export default CreateFoodService;
