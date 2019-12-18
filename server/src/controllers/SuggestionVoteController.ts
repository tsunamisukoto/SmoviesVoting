import { Request, Response } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { validate } from "class-validator";

import { SuggestionVote } from "../entity/SuggestionVote";
import { getAuthToken } from "../common/authToken";

export class SuggestionVoteController {
    static newSuggestionVote = async (req: Request, res: Response) => {
        //Get parameters from the body
        const userId = getAuthToken(req).userId;
        let { suggestionIds, voteSessionId } = req.body;
        suggestionIds.forEach(suggestionId => {
            let newSuggestionVote = new SuggestionVote();
            newSuggestionVote.suggestionId = suggestionId;
            newSuggestionVote.voteSessionId = voteSessionId;
            newSuggestionVote.userId = userId;
            // const errors = await validate(newSuggestionVote);
            // if (errors.length > 0) {
            //     res.status(400).send(errors);
            //     return;
            // }

            // //Try to save. If fails, the suggestionVotename is already in use
            // const suggestionVoteRepository = getRepository(SuggestionVote);
            // try {
            //     await suggestionVoteRepository.save(newSuggestionVote);
            // } catch (e) {
            //     res.status(409).send('suggestionVotename already in use');
            //     return;
            // }
        });


        //If all ok, send 201 response
        res.status(201).send({});
    };
}