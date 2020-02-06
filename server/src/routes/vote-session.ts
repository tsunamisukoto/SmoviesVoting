import { Router } from "express";
import { VoteSessionController } from "../controllers/VoteSessionController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all suggestions
router.get("/", [checkJwt], VoteSessionController.listAll);

//Create a new suggestion
router.post("/", [checkJwt, checkRole(["ADMIN"])], VoteSessionController.newVoteSession);

//Calculate suggestions for a session
router.post("/calculate", [checkJwt, checkRole(["ADMIN"])], VoteSessionController.calculate);

//Edit one suggestion
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    VoteSessionController.editVoteSession
);

//Delete one suggestion
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    VoteSessionController.deleteVoteSession
);

export default router;