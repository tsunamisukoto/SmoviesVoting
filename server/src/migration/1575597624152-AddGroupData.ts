import {MigrationInterface, QueryRunner, getRepository} from 'typeorm';
import { Group } from '../entity/Group';

export class AddGroupData1575597624152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const groups = [
            { name: 'Group 1'},
            { name: 'Group 2'},
            { name: 'Group 3'},
            { name: 'Group 4'},
            { name: 'Group 5'},
            { name: 'Group 6'}
        ];
        const groupRepository = getRepository(Group);
        await groupRepository.save(groups);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
