import { getRepository } from 'typeorm';

import Room from '../models/Room';

interface Request {
    room_id: string;
}

class SetRoomBusyService {
    public async execute({ room_id }: Request): Promise<void> {
        const roomsRepository = getRepository(Room);

        const room = await roomsRepository.findOne(room_id);

        if (!room) {
            throw new Error('This room does not exist!');
        }

        if (room.busy) {
            throw new Error('This room is already busy');
        }

        room.busy = true;

        await roomsRepository.save(room);
    }
}

export default SetRoomBusyService;
