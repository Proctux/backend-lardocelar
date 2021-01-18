import { getRepository } from 'typeorm';

import Room from '../models/Room';

class ListAvailableRoomsService {
    public async execute(): Promise<Room[]> {
        const roomsRepository = getRepository(Room);

        const availableRooms = await roomsRepository.find({
            where: { busy: false },
        });

        if (!availableRooms) {
            throw new Error('There are no available rooms at the moment');
        }

        return availableRooms;
    }
}

export default ListAvailableRoomsService;
