import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Room } from "../entity/Room";

export class AddRoomData1575632810951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        const rooms = [
            { groupId: 1, name: 'Room 1' },
            { groupId: 1, name: 'Room 2' },
            { groupId: 1, name: 'Room 3' },
            { groupId: 2, name: 'Room 4' },
            { groupId: 2, name: 'Room 5' },
            { groupId: 2, name: 'Room 6' },
            { groupId: 3, name: 'Room 7' },
            { groupId: 3, name: 'Room 8' },
            { groupId: 3, name: 'Room 9' },
            { groupId: 3, name: 'Room 10' },
            { groupId: 4, name: 'Room 11' },
            { groupId: 4, name: 'Room 12' },
            { groupId: 4, name: 'Room 13' },
            { groupId: 4, name: 'Room 14' },
            { groupId: 5, name: 'Room 15' }
        ];
        const roomRepository = getRepository(Room);
        await roomRepository.save(rooms);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
