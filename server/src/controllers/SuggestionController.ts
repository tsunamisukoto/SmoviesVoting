import { Request, Response } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import { validate } from 'class-validator';

import { Suggestion } from '../entity/Suggestion';
import { getAuthToken } from '../common/authToken';
import { SocketConnection } from '../common/socketConnection';

export class SuggestionController {

    static listAll = async (req: Request, res: Response) => {
        // Get suggestions from database
        const roomId = parseInt(req.query.roomId);
        const suggestionRepository = getRepository(Suggestion);
        const suggestions = await suggestionRepository.find({
            select: ['id', 'suggestion', 'userId', 'createdAt'],
            where: { roomId }
        });
        // Send the suggestions object
        res.send(suggestions);
    }

    static newSuggestion = async (req: Request, res: Response) => {
        // Get parameters from the body
        const { suggestion, roomId } = req.body;
        const newSuggestion = new Suggestion();
        newSuggestion.suggestion = suggestion;
        newSuggestion.roomId = roomId;
        const userId = getAuthToken(req).userId;
        newSuggestion.userId = userId;
        // Validade if the parameters are ok
        const errors = await validate(newSuggestion);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Try to save. If fails, the suggestionname is already in use
        const suggestionRepository = getRepository(Suggestion);
        try {
            await suggestionRepository.save(newSuggestion);
        } catch (e) {
            res.status(409).send('suggestionname already in use');
            return;
        }
        SocketConnection.suggestionChanged(roomId);
        // If all ok, send 201 response
        res.status(201).send({});
    }

    static editSuggestion = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.id;

        // Get values from the body
        const { suggestionname, role } = req.body;

        // Try to find suggestion on database
        const suggestionRepository = getRepository(Suggestion);
        let suggestion;
        try {
            suggestion = await suggestionRepository.findOneOrFail(id);
        } catch (error) {
            // If not found, send a 404 response
            res.status(404).send('Suggestion not found');
            return;
        }

        // Validate the new values on model
        suggestion.suggestionname = suggestionname;
        suggestion.role = role;
        const errors = await validate(suggestion);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        // Try to safe, if fails, that means suggestionname already in use
        try {
            await suggestionRepository.save(suggestion);
        } catch (e) {
            res.status(409).send('suggestionname already in use');
            return;
        }
        SocketConnection.suggestionChanged(suggestion.roomId);
        // After all send a 204 (no content, but accepted) response
        res.status(204).send();
    }

    static deleteSuggestion = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.id;

        const suggestionRepository = getRepository(Suggestion);
        let suggestion: Suggestion;
        try {
            suggestion = await suggestionRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send('Suggestion not found');
            return;
        }
        SocketConnection.suggestionChanged(suggestion.roomId);
        suggestionRepository.delete(id);

        // After all send a 204 (no content, but accepted) response
        res.status(204).send();
    }
}
