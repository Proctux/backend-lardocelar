import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Room from '../models/Room';
import CreateRoomService from '../services/CreateRoomService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ListAvailableRoomsService from '../services/ListAvailableRoomsService';
import uploadConfig from '../config/upload';
import UpdateRoomImageService from '../services/UpdateRoomImageService';

const roomsRouter = Router();
const upload = multer(uploadConfig);

roomsRouter.get('/', async (request, response) => {
    const roomsRepository = getRepository(Room);
    const rooms = await roomsRepository.find();

    return response.json(rooms);
});

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

roomsRouter.patch(
    '/update-image',
    ensureAuthenticated,
    upload.single('room-image'),
    async (request, response) => {
        try {
            const { id } = request.body;

            const updateRoomImage = new UpdateRoomImageService();

            const room = await updateRoomImage.execute({
                id,
                filename: request.file.filename,
            });

            return response.json(room);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

export default roomsRouter;
