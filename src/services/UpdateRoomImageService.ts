import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Room from '../models/Room';
import uploadConfig from '../config/upload';

interface Request {
    id: string;
    filename: string;
}

class UpdateRoomImageService {
    public async execute({ id, filename }: Request): Promise<Room> {
        const roomsRepository = getRepository(Room);

        const room = await roomsRepository.findOne(id);

        if (!room) {
            throw new Error(
                'Only authenticated users can update the room image',
            );
        }

        if (room.image) {
            const imageFilePath = path.join(uploadConfig.directory, room.image);
            const imageFileExists = await fs.promises.stat(imageFilePath);

            if (imageFileExists) {
                await fs.promises.unlink(imageFilePath);
            }
        }

        room.image = filename;

        await roomsRepository.save(room);

        return room;
    }
}

export default UpdateRoomImageService;
