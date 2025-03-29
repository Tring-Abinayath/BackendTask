import { MigrationInterface, QueryRunner } from "typeorm";

export class Courses1743227722230 implements MigrationInterface {
    name = 'Courses1743227722230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("c_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "c_name" character varying(30) NOT NULL, "c_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "c_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "c_deleted_at" TIME WITH TIME ZONE DEFAULT 'NOW()', CONSTRAINT "PK_09bbe14d0dee15626298fd62b07" PRIMARY KEY ("c_id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_deleted_at" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_deleted_at" SET DEFAULT '2025-03-29 10:58:17.360486+05:30'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_updated_at" SET DEFAULT '2025-03-29 10:58:17.360486+05:30'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_created_at" SET DEFAULT '2025-03-29 10:58:17.360486+05:30'`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
