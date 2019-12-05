import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Room } from "../entity/Room";

export class RoomController {

    static listAll = async (req: Request, res: Response) => {
        //Get rooms from database
        const groupId = parseInt(req.query.groupId);
        const roomRepository = getRepository(Room);
        const rooms = await roomRepository.find({
            select: ["id", "name"],
            where: { groupId }
        });

        //Send the rooms object
        res.send(rooms);
    };

    static getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const roomRepository = getRepository(Room);
        // const room = await roomRepository.findOne({
        //     select: ["id", "name", "description"],
        //     where: { id }
        // });

        const room = await roomRepository.createQueryBuilder("room").leftJoinAndSelect("room.group", "group").select( ["room.id", "room.name", "room.description", "group.name", "group.id"]).where({id}).getOne();
        
        //Send the rooms object
        res.send(room);
    }

    static newRoom = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { name, description } = req.body;
        const groupId = parseInt(req.params.groupId);
        let room = new Room();
        room.name = name;
        room.description = description;
        room.groupId = groupId;
        //Validade if the parameters are ok
        const errors = await validate(room);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the roomname is already in use
        const roomRepository = getRepository(Room);
        try {
            await roomRepository.save(room);
        } catch (e) {
            res.status(409).send("roomname already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Room created");
    };

    static editRoom = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { roomname, role } = req.body;

        //Try to find room on database
        const roomRepository = getRepository(Room);
        let room;
        try {
            room = await roomRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Room not found");
            return;
        }

        //Validate the new values on model
        room.roomname = roomname;
        room.role = role;
        const errors = await validate(room);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means roomname already in use
        try {
            await roomRepository.save(room);
        } catch (e) {
            res.status(409).send("roomname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteRoom = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const roomRepository = getRepository(Room);
        let room: Room;
        try {
            room = await roomRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Room not found");
            return;
        }
        roomRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
}