import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePasswordLength1743590019141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN u_password TYPE VARCHAR(255)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN u_password TYPE VARCHAR(8)`)
    }

}
