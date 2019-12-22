import { Router } from "express";
import { SuggestionVoteController } from "../controllers/SuggestionVoteController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();


//Create a new suggestion
router.post("/", [checkJwt], SuggestionVoteController.newSuggestionVote);

export default router;