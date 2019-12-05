import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { RoomMessage } from "../entity/RoomMessage";

export class AddMessages1575685382942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        
        const rooms = [
            { roomId: 1, message: 'Room 1', userId: 1},
            { roomId: 1, message: 'Room 2', userId: 1},
            { roomId: 1, message: 'Room 3', userId: 1},
            { roomId: 2, message: 'Room 4', userId: 1},
            { roomId: 2, message: 'Room 5', userId: 1},
            { roomId: 2, message: 'Room 6', userId: 1},
            { roomId: 3, message: 'Room 7', userId: 1},
            { roomId: 3, message: 'Room 8', userId: 1},
            { roomId: 3, message: 'Room 9', userId: 1},
            { roomId: 3, message: 'Room 10', userId: 1 },
            { roomId: 4, message: 'Room 11', userId: 1 },
            { roomId: 4, message: 'Room 12', userId: 1 },
            { roomId: 4, message: 'Room 13', userId: 1 },
            { roomId: 4, message: 'Room 14', userId: 1 },
            { roomId: 5, message: 'Room 15', userId: 1 }
        ];
        const roomRepository = getRepository(RoomMessage);
        await roomRepository.save(rooms);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
