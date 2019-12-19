import { Request, Response } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import { validate } from 'class-validator';

import { SuggestionVote } from '../entity/SuggestionVote';
import { getAuthToken } from '../common/authToken';

export class SuggestionVoteController {
    static newSuggestionVote = async (req: Request, res: Response) => {
        const userId = getAuthToken(req).userId;
        const { suggestionIds, voteSessionId } = req.body as { suggestionIds: number[], voteSessionId: number };
        const suggestionVoteRepository = getRepository(SuggestionVote);

        const sessionQuery = suggestionVoteRepository.createQueryBuilder('vote')
            .where('vote.voteSessionId = (:voteSessionId) AND vote.userId = (:userId)', { voteSessionId, userId });
        const removeAllVotesNotNeeded =  suggestionVoteRepository.createQueryBuilder('vote')
        .where('vote.voteSessionId = (:voteSessionId) AND vote.userId = (:userId)', { voteSessionId, userId })
            .where('vote.suggestionId NOT IN (:suggestionIds)', { suggestionIds })
            .select('vote.id')
            .getMany().then(suggestionVoteIdsToRemove => {
                return suggestionVoteRepository.remove(suggestionVoteIdsToRemove);
            });

        const addNewVotes =
            sessionQuery.select('vote.suggestionId').getMany().then(existingSuggestions => {
                const existingSuggestionIds = existingSuggestions.map(s => s.suggestionId);
                console.log('existing');
                console.log(existingSuggestionIds);
                const newSuggestionIds = suggestionIds.filter(newSugg => existingSuggestionIds.indexOf(newSugg) === -1)
                console.log('new');
                console.log(newSuggestionIds);
                return newSuggestionIds.map(suggestionId => {

                    const newSuggestionVote = new SuggestionVote();
                    newSuggestionVote.suggestionId = suggestionId;
                    newSuggestionVote.voteSessionId = voteSessionId;
                    newSuggestionVote.userId = userId;
                    return validate(newSuggestionVote)
                        .then(errors => {
                            if (errors.length > 0) {
                                res.status(400).send(errors);
                                return null;
                            }
                        }).then(() => {
                            return suggestionVoteRepository.save(newSuggestionVote)
                                .then((sugg) => {
                                    console.log(suggestionId + 'saved');
                                    return sugg;
                                });
                        });
                });
            });

        Promise.all([removeAllVotesNotNeeded,
            addNewVotes])
            .then(() => res.status(201).send({}))
            .catch((e) => console.log(e));

    }
}
