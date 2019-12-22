import { Router } from "express";
import { GroupController } from "../controllers/GroupController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all groups
router.get("/", [checkJwt], GroupController.listAll);

//Create a new group
router.post("/", [checkJwt, checkRole(["ADMIN"])], GroupController.newGroup);

//Edit one group
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    GroupController.editGroup
);

//Delete one group
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    GroupController.deleteGroup
);

export default router;