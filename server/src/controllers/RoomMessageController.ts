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
        roomMessageRepository
            .createQueryBuilder("roomMessage")
            .leftJoinAndSelect("roomMessage.user", "user")
            .select(["roomMessage.id", "roomMessage.message", "roomMessage.userId", "roomMessage.createdAt", "user.username"])
            .where({ roomId })
            .getMany()
            .then(roomMessages => res.send(roomMessages));
        //Send the roomMessages object

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
}