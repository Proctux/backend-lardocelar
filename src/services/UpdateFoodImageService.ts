import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Food from '../models/Food';
import uploadConfig from '../config/upload';

interface Request {
    food_id: string;
    filename: string;
}

class UpdateFoodImageService {
    public async execute({ food_id, filename }: Request): Promise<Food> {
        const foodsRepository = getRepository(Food);

        const food = await foodsRepository.findOne(food_id);

        if (!food) {
            throw new Error('Only authenticated users can update a food image');
        }

        if (food.image) {
            const imageFilePath = path.join(uploadConfig.directory, food.image);
            const imageFileExists = await fs.promises.stat(imageFilePath);

            if (imageFileExists) {
                await fs.promises.unlink(imageFilePath);
            }
        }

        food.image = filename;

        await foodsRepository.save(food);

        return food;
    }
}

export default UpdateFoodImageService;
