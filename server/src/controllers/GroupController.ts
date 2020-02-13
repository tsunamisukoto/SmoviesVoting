import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Group } from '../entity/Group';
import { SocketConnection } from '../common/socketConnection';
import { getAuthToken } from '../common/authToken';

export class GroupController {

    static listAll = async (req: Request, res: Response) => {
        const groupRepository = getRepository(Group);
        groupRepository.find({
            select: ['id', 'name', 'shortDescription', ] 
        }).then(groups => res.send(groups));
    }

    static getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const groupRepository = getRepository(Group);

        groupRepository.findOne(id, {select: ['id', 'name', 'shortDescription', 'description']}).then(group => res.send(group));
    }

    static newGroup = async (req: Request<{ name, description, shortDescription }>, res: Response) => {
        // Get parameters from the body
        const { name, description, shortDescription } = req.body;
        const group = new Group();
        group.name = name;
        group.description = description;
        group.shortDescription = shortDescription;
        group.createdUserId = getAuthToken(req).userId;
        // Validade if the parameters are ok
        validate(group).then(errors => {
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            const groupRepository = getRepository(Group);
            groupRepository.save(group).catch((e) => res.status(409).send(e)).then(g => {
                SocketConnection.groupChanged();
                return res.status(201).send(g);
            });
        });
    }

    static editGroup = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.id;

        // Get values from the body
        const { groupname, role } = req.body;

        // Try to find group on database
        const groupRepository = getRepository(Group);
        groupRepository.findOneOrFail(id)
            .catch(error => {
                res.status(404).send('Group not found');
            })
            .then((group: Group) => {
                group.name = groupname;
                validate(group).then(errors => {
                    if (errors.length > 0) {
                        res.status(400).send(errors);
                        return;
                    }
                    groupRepository.save(group)
                        .catch(e => res.status(409).send('failed'))
                        .then(g => {
                            SocketConnection.groupChanged();
                            res.status(204).send();
                        });
                });

            });
    }

    static deleteGroup = async (req: Request, res: Response) => {
        // Get the ID from the url
        const id = req.params.id;

        const groupRepository = getRepository(Group);
        groupRepository
            .findOneOrFail(id)
            .catch(e => res.status(404).send('Group not found'))
            .then(group => groupRepository.delete(id))
            .then(() => {
                SocketConnection.groupChanged();
                res.status(200).send();
            });
    }
}
