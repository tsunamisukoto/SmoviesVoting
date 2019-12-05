import { Request, Response } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { validate } from "class-validator";

import { SuggestionVote } from "../entity/SuggestionVote";
import { getAuthToken } from "../common/authToken";

export class SuggestionVoteController {
    static newSuggestionVote = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { suggestionId, voteSessionId } = req.body;
        let newSuggestionVote = new SuggestionVote();
        newSuggestionVote.suggestionId = suggestionId;
        newSuggestionVote.voteSessionId = voteSessionId;
        const userId = getAuthToken(req).userId;
        newSuggestionVote.userId = userId;
        //Validade if the parameters are ok
        const errors = await validate(newSuggestionVote);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the suggestionVotename is already in use
        const suggestionVoteRepository = getRepository(SuggestionVote);
        try {
            await suggestionVoteRepository.save(newSuggestionVote);
        } catch (e) {
            res.status(409).send("suggestionVotename already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send({});
    };
}