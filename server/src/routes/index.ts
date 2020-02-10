import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import room from './room';
import group from './group';
import roomMessage from './room-message';
import suggestion from './suggestion';
import voteSession from './vote-session';
import suggestionVote from './suggestion-vote';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/group', group);
routes.use('/room', room);
routes.use('/room/message', roomMessage);
routes.use('/suggestion', suggestion);
routes.use('/suggestionVote', suggestionVote);
routes.use('/voteSession', voteSession);

export default routes;
