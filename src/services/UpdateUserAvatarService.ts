import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
    user_id: string;
    filename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, filename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can update an avatar!');
        }

        if (user.avatar) {
            const avatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const avatarFileExists = await fs.promises.stat(avatarFilePath);

            if (avatarFileExists) {
                await fs.promises.unlink(avatarFilePath);
            }
        }

        user.avatar = filename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
