import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
    room_id: string;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
        room_id,
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new Error('This user is already registered');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            room_id,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
