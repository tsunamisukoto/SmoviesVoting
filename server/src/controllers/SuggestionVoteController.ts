import { Request, Response } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { validate } from "class-validator";

import { SuggestionVote } from "../entity/SuggestionVote";
import { getAuthToken } from "../common/authToken";

export class SuggestionVoteController {
    static newSuggestionVote = async (req: Request, res: Response) => {
        //Get parameters from the body
        const userId = getAuthToken(req).userId;
        let { suggestionIds, voteSessionId } = req.body as { suggestionIds: number[], voteSessionId: number };
        Promise.all(suggestionIds);

        Promise.all(suggestionIds.map(suggestionId => {

            let newSuggestionVote = new SuggestionVote();
            newSuggestionVote.suggestionId = suggestionId;
            newSuggestionVote.voteSessionId = voteSessionId;
            newSuggestionVote.userId = userId;
            return validate(newSuggestionVote)
                .then(errors => {
                    if (errors.length > 0) {
                        res.status(400).send(errors);
                        return;
                    }
                }).then(() => {
                    const suggestionVoteRepository = getRepository(SuggestionVote);
                    return suggestionVoteRepository.save(newSuggestionVote).catch(e => res.status(409).send('suggestionVotename already in use')).then(() => console.log(suggestionId + "saved"));
                })
        })).then(() => res.status(201).send({}))
        .catch((e) => console.log(e))

    };
}