import { Router } from 'express';

import CreateRoomService from '../services/CreateRoomService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ListAvailableRoomsService from '../services/ListAvailableRoomsService';

const roomsRouter = Router();

roomsRouter.get('/available-rooms', async (request, response) => {
    try {
        const listAvailableRooms = new ListAvailableRoomsService();

        const rooms = await listAvailableRooms.execute();

        return response.json(rooms);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

roomsRouter.post('/', ensureAuthenticated, async (request, response) => {
    try {
        const { room_number, busy, vip } = request.body;

        const createRoom = new CreateRoomService();

        const room = await createRoom.execute({
            room_number,
            busy,
            vip,
        });

        return response.json(room);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default roomsRouter;
