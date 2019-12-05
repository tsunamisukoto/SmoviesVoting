import { Request, Response } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { validate } from "class-validator";

import { RoomMessage } from "../entity/RoomMessage";
import { getAuthToken } from "../common/authToken";

export class RoomMessageController {

    static listAll = async (req: Request, res: Response) => {
        //Get roomMessages from database
        const roomId = parseInt(req.query.roomId);
        const roomMessageRepository = getRepository(RoomMessage);
        const roomMessages = await roomMessageRepository.createQueryBuilder("roomMessage").leftJoinAndSelect("roomMessage.user", "user").select( ["roomMessage.id", "roomMessage.message", "roomMessage.userId", "roomMessage.createdAt", "user.username"]).where({roomId}).getMany();
        //Send the roomMessages object
        res.send(roomMessages);
    };

    static newRoomMessage = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { message, roomId } = req.body;
        let roomMessage = new RoomMessage();
        roomMessage.message = message;
        roomMessage.roomId = roomId;
        const userId = getAuthToken(req).userId;
        roomMessage.userId = userId;
        //Validade if the parameters are ok
        const errors = await validate(roomMessage);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the roomMessagename is already in use
        const roomMessageRepository = getRepository(RoomMessage);
        try {
            await roomMessageRepository.save(roomMessage);
        } catch (e) {
            res.status(409).send("roomMessagename already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send({});
    };

    static editRoomMessage = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { roomMessagename, role } = req.body;

        //Try to find roomMessage on database
        const roomMessageRepository = getRepository(RoomMessage);
        let roomMessage;
        try {
            roomMessage = await roomMessageRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("RoomMessage not found");
            return;
        }

        //Validate the new values on model
        roomMessage.roomMessagename = roomMessagename;
        roomMessage.role = role;
        const errors = await validate(roomMessage);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means roomMessagename already in use
        try {
            await roomMessageRepository.save(roomMessage);
        } catch (e) {
            res.status(409).send("roomMessagename already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteRoomMessage = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const roomMessageRepository = getRepository(RoomMessage);
        let roomMessage: RoomMessage;
        try {
            roomMessage = await roomMessageRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("RoomMessage not found");
            return;
        }
        roomMessageRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
}