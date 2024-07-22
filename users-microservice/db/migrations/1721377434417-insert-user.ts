import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

const TABLE_NAME = 'users';
const EMAIL = 'testUser@gmail.com';

export class InsertUser1721377434417 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersRepository = queryRunner.manager.getRepository(TABLE_NAME);

        usersRepository.insert({
            name: 'testUser',
            email: 'testUser@gmail.com',
            age: 35,
            password: await bcrypt.hash('qwe123@', 10),
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usersRepository = queryRunner.manager.getRepository(TABLE_NAME);
        usersRepository.delete({ email: EMAIL });
    }
}
