import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Group } from "../entity/Group";

export class GroupController {

    static listAll = async (req: Request, res: Response) => {
        //Get groups from database
        const groupRepository = getRepository(Group);
        const groups = await groupRepository.find({
            select: ["id", "name"] //We dont want to send the passwords on response
        });

        //Send the groups object
        res.send(groups);
    };

    // static getOneById = async (req: Request, res: Response) => {
    //     //Get the ID from the url
    //     const id: number = req.params.id as any;

    //     //Get the group from database
    //     const groupRepository = getRepository(Group);
    //     try {
    //         const group = await groupRepository.findOneOrFail(id, {
    //             select: ["id", "name", "role"] //We dont want to send the password on response
    //         });
    //     } catch (error) {
    //         res.status(404).send("Group not found");
    //     }
    // };

    static newGroup = async (req: Request, res: Response) => {
        //Get parameters from the body
        const { name, description } = req.body;
        const group = new Group();
        group.name = name;
        group.description = description;
        //Validade if the parameters are ok
        const errors = await validate(group);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the groupname is already in use
        const groupRepository = getRepository(Group);
        try {
            await groupRepository.save(group);
        } catch (e) {
            res.status(409).send("groupname already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Group created");
    };

    static editGroup = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { groupname, role } = req.body;

        //Try to find group on database
        const groupRepository = getRepository(Group);
        let group;
        try {
            group = await groupRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Group not found");
            return;
        }

        //Validate the new values on model
        group.groupname = groupname;
        group.role = role;
        const errors = await validate(group);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means groupname already in use
        try {
            await groupRepository.save(group);
        } catch (e) {
            res.status(409).send("groupname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteGroup = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const groupRepository = getRepository(Group);
        let group: Group;
        try {
            group = await groupRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Group not found");
            return;
        }
        groupRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
}