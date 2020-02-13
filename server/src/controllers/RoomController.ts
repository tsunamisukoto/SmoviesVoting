import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Room } from '../entity/Room';
import { SocketConnection } from '../common/socketConnection';
import { getAuthToken } from '../common/authToken';

export class RoomController {

    static listAll = async (req: Request, res: Response) => {
        // Get rooms from database
        const groupId = parseInt(req.query.groupId);
        const roomRepository = getRepository(Room);
        roomRepository.find({
            select: ['id', 'name'],
            where: { groupId }
        }).then(rooms => res.send(rooms));
    }

    static getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const roomRepository = getRepository(Room);

        roomRepository
            .createQueryBuilder('room')
            .leftJoinAndSelect('room.group', 'group')
            .select(['room.id', 'room.name', 'room.description', 'group.name', 'group.id'])
            .where({ id })
            .getOne().then(room => res.send(room));
    }

    static newRoom = async (req: Request, res: Response) => {
        // Get parameters from the body
        const { name, description } = req.body;
        const groupId = parseInt(req.params.groupId);
        const room = new Room();
        room.name = name;
        room.description = description;
        room.createdUserId = getAuthToken(req).userId;
        room.groupId = groupId;
        validate(room).then(errors => {

            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            const roomRepository = getRepository(Room);
            roomRepository.save(room).catch(e => {
                res.status(409).send('roomname already in use');
            }).then(r => {
                SocketConnection.roomChanged(groupId);
                res.status(201).send(r);
            });
        });
    }

    static editRoom = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.id;

        // Get values from the body
        const { name } = req.body;

        // Try to find room on database
        const roomRepository = getRepository(Room);
        roomRepository
            .findOneOrFail(id)
            .catch(() => res.status(404).send('Room not found'))
            .then((room: Room) => {
                room.name = name;
                validate(room).then(errors => {
                    if (errors.length > 0) {
                        res.status(400).send(errors);
                        return;
                    }
                    roomRepository.save(room)
                        .catch(() => res.status(409).send('roomname already in use')).then(room =>
                            res.status(204).send());
                });
            });
    }

    static deleteRoom = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.id;

        const roomRepository = getRepository(Room);
        roomRepository.findOneOrFail(id)
            .catch(() => res.status(404).send('Room not found'))
            .then((room) => roomRepository.delete(id))
            .then(() => res.status(200).send());
    }
}
