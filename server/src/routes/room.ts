import { Router } from 'express';
import { RoomController } from '../controllers/RoomController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

// Get all rooms
router.get('/', [checkJwt], RoomController.listAll);

// Create a new room
router.post('/:groupId([0-9]+)', [checkJwt, checkRole(['ADMIN'])], RoomController.newRoom);

// Edit one room
router.patch(
    '/:id([0-9]+)',
    [checkJwt, checkRole(['ADMIN'])],
    RoomController.editRoom
);

// Delete one room
router.delete(
    '/:id([0-9]+)',
    [checkJwt, checkRole(['ADMIN'])],
    RoomController.deleteRoom
);
// Delete one room
router.get(
    '/:id([0-9]+)',
    [checkJwt, checkRole(['ADMIN'])],
    RoomController.getById
);

export default router;
