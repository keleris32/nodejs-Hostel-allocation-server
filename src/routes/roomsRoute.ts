import express from 'express';
import { isAuth } from '../middlewares/auth';
import { getAvailableRooms } from '../controllers/rooms/getAvailableRoomsController';
// import { allocateRoomController } from '../controllers/rooms/allocateRoomController';

const roomsRouter = express.Router();

//@desc Fetch available rooms
//@route POST /api/route/rooms
roomsRouter.get('/rooms', isAuth, getAvailableRooms);

//@desc Allocate room to student
//@route POST /api/route/rooms
// roomsRouter.post('/rooms/allocate', isAuth, allocateRoomController);

export default roomsRouter;
