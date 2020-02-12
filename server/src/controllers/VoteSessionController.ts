import { Request, Response } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import { validate } from 'class-validator';

import { VoteSession } from '../entity/VoteSession';
import { getAuthToken } from '../common/authToken';
import { SuggestionVote } from '../entity/SuggestionVote';
import { Suggestion } from '../entity/Suggestion';
import { SocketConnection } from '../common/socketConnection';

export class VoteSessionController {

    static listAll = async (req: Request, res: Response) => {
        // Get voteSessions from database
        const roomId = parseInt(req.query.roomId);
        const voteSessionRepository = getRepository(VoteSession);
        const voteSessions = await voteSessionRepository.find({
            select: ['id', 'userId', 'createdAt'],
            where: { roomId }
        });
        // Send the voteSessions object
        res.send(voteSessions);
    }

    static newVoteSession = async (req: Request, res: Response) => {
        // Get parameters from the body
        const { roomId } = req.body;
        const newVoteSession = new VoteSession();
        newVoteSession.roomId = roomId;
        const userId = getAuthToken(req).userId;
        newVoteSession.userId = userId;
        // Validade if the parameters are ok
        const errors = await validate(newVoteSession);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Try to save. If fails, the voteSessionname is already in use
        const voteSessionRepository = getRepository(VoteSession);
        try {
            await voteSessionRepository.save(newVoteSession);
        } catch (e) {
            res.status(409).send('voteSessionname already in use');
            return;
        }
        SocketConnection.sessionsChanged(roomId);
        // If all ok, send 201 response
        res.status(201).send({});
    }

    static editVoteSession = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.id;

        // Get values from the body
        const { voteSessionname, role } = req.body;

        // Try to find voteSession on database
        const voteSessionRepository = getRepository(VoteSession);
        let voteSession;
        try {
            voteSession = await voteSessionRepository.findOneOrFail(id);
        } catch (error) {
            // If not found, send a 404 response
            res.status(404).send('VoteSession not found');
            return;
        }

        // Validate the new values on model
        voteSession.voteSessionname = voteSessionname;
        voteSession.role = role;
        const errors = await validate(voteSession);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Try to safe, if fails, that means voteSessionname already in use
        try {
            await voteSessionRepository.save(voteSession);
        } catch (e) {
            res.status(409).send('voteSessionname already in use');
            return;
        }
        SocketConnection.sessionsChanged(voteSession.roomId);
        // After all send a 204 (no content, but accepted) response
        res.status(204).send();
    }

    static deleteVoteSession = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.id;

        const voteSessionRepository = getRepository(VoteSession);
        let voteSession: VoteSession;
        try {
            voteSession = await voteSessionRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send('VoteSession not found');
            return;
        }
        voteSessionRepository.delete(id);
        SocketConnection.sessionsChanged(voteSession.roomId);
        // After all send a 204 (no content, but accepted) response
        res.status(204).send();
    }


    static calculate = async (req: Request, res: Response) => {
        // Get voteSessions from database
        const { voteSessionId } = req.body;
        const suggestionVoteRepository = getRepository(SuggestionVote);
        const suggestionRepository = getRepository(Suggestion);
        const suggestionVotes = await suggestionVoteRepository.find({
            where: { voteSessionId }
        });

        const suggestions = await suggestionRepository.createQueryBuilder('suggestion')
            .where('suggestion.id IN (:...suggestionIds)', {
                suggestionIds: suggestionVotes.map((sugg) => sugg.suggestionId)
            }).select('suggestion', 'id').getMany();
        const ret = suggestionVotes.reduce((previousVal, vote) => {
            let suggestionForId = previousVal.find(v => v.suggestion && v.suggestion.id === vote.suggestionId);
            if (suggestionForId == null) {
                const suggestion = suggestions.find(sug => sug.id === vote.suggestionId);
                suggestionForId = {
                    suggestion,
                    count: 0
                };
                previousVal.push(suggestionForId);
            }
            suggestionForId.count++;
            return previousVal;
        }, [] as Array<CalculatedModel>);

        // Send the voteSessions object
        res.send(ret);
    }
}
export class CalculatedModel {
    suggestion: { id: number, suggestion: string };
    count: number;
}
