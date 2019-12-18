import { Router } from "express";
import { RoomMessageController } from "../controllers/RoomMessageController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all roomMessages
router.get("/", [checkJwt, checkRole(["ADMIN"])], RoomMessageController.listAll);

//Create a new roomMessage
router.post("/", [checkJwt, checkRole(["ADMIN"])], RoomMessageController.newRoomMessage);

export default router;