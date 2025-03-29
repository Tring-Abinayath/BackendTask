import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseMaterial1743231487414 implements MigrationInterface {
    name = 'CourseMaterial1743231487414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_material" ("c_mat_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "c_mat_upload" character varying NOT NULL, "c_mat_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "c_mat_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "c_mat_deleted_at" TIME WITH TIME ZONE DEFAULT 'NOW()', "c_id" uuid, CONSTRAINT "PK_118a3bc284bffd162cb0eaf613d" PRIMARY KEY ("c_mat_id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_deleted_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_deleted_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "course_material" ADD CONSTRAINT "FK_3d342051f245c59b9a328b28fa3" FOREIGN KEY ("c_id") REFERENCES "courses"("c_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_material" DROP CONSTRAINT "FK_3d342051f245c59b9a328b28fa3"`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_deleted_at" SET DEFAULT '11:27:00.616288+05:30'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_updated_at" SET DEFAULT '11:27:00.616288+05:30'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_created_at" SET DEFAULT '11:27:00.616288+05:30'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_deleted_at" SET DEFAULT '2025-03-29 11:27:00.616288+05:30'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_updated_at" SET DEFAULT '2025-03-29 11:27:00.616288+05:30'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_created_at" SET DEFAULT '2025-03-29 11:27:00.616288+05:30'`);
        await queryRunner.query(`DROP TABLE "course_material"`);
    }

}
