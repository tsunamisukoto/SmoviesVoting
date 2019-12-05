import { Router } from "express";
import { SuggestionController } from "../controllers/SuggestionController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all suggestions
router.get("/", [checkJwt, checkRole(["ADMIN"])], SuggestionController.listAll);

//Create a new suggestion
router.post("/", [checkJwt, checkRole(["ADMIN"])], SuggestionController.newSuggestion);

//Edit one suggestion
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    SuggestionController.editSuggestion
);

//Delete one suggestion
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    SuggestionController.deleteSuggestion
);

export default router;