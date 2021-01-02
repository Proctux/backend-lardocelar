import { Router } from 'express';

import CreateRoomService from '../services/CreateRoomService';

const roomsRouter = Router();

roomsRouter.post('/', async (request, response) => {
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
