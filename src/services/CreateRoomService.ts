import { getRepository } from 'typeorm';

import Room from '../models/Room';

interface Request {
    room_number: number;
    busy: boolean;
    vip: boolean;
}

class CreateRoomService {
    public async execute({ room_number, busy, vip }: Request): Promise<Room> {
        const roomsRepository = getRepository(Room);

        const checkRoomExists = await roomsRepository.findOne({
            where: { room_number },
        });

        if (checkRoomExists) {
            throw new Error('This room is already registered');
        }

        const room = roomsRepository.create({
            room_number,
            busy,
            vip,
        });

        await roomsRepository.save(room);

        return room;
    }
}

export default CreateRoomService;
