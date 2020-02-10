import { Router } from 'express';
import { SuggestionVoteController } from '../controllers/SuggestionVoteController';
import { checkJwt } from '../middlewares/checkJwt';

const router = Router();


// Create a new suggestion
router.post('/', [checkJwt], SuggestionVoteController.newSuggestionVote);

export default router;
