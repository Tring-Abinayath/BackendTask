import { MigrationInterface, QueryRunner } from "typeorm";

export class Assignment1743244542536 implements MigrationInterface {
    name = 'Assignment1743244542536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assignment" ("a_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "a_qn" character varying NOT NULL, "a_upload" character varying NOT NULL, "a_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "a_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "a_deleted_at" TIME WITH TIME ZONE DEFAULT 'NOW()', "c_id" uuid, CONSTRAINT "PK_298c3b2184ef934dcee0eda61e0" PRIMARY KEY ("a_id"))`);
        await queryRunner.query(`CREATE TABLE "student_assignment" ("sa_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sa_upload" character varying NOT NULL, "sa_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "sa_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "sa_deleted_at" TIME WITH TIME ZONE DEFAULT 'NOW()', "u_id" uuid, "a_id" uuid, CONSTRAINT "PK_a48d402f9c1f473896f347a82ff" PRIMARY KEY ("sa_id"))`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_deleted_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_deleted_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_7407ca633f86ae465468368f981" UNIQUE ("u_email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_deleted_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "assignment" ADD CONSTRAINT "FK_096d9ce008ed011490ee0c53a74" FOREIGN KEY ("c_id") REFERENCES "courses"("c_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ADD CONSTRAINT "FK_f0baee8c8bda1049ef3d7ff51fc" FOREIGN KEY ("u_id") REFERENCES "user"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ADD CONSTRAINT "FK_9b7c3b47bf92f69eb0bcaa9b199" FOREIGN KEY ("a_id") REFERENCES "assignment"("a_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_assignment" DROP CONSTRAINT "FK_9b7c3b47bf92f69eb0bcaa9b199"`);
        await queryRunner.query(`ALTER TABLE "student_assignment" DROP CONSTRAINT "FK_f0baee8c8bda1049ef3d7ff51fc"`);
        await queryRunner.query(`ALTER TABLE "assignment" DROP CONSTRAINT "FK_096d9ce008ed011490ee0c53a74"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_deleted_at" SET DEFAULT '2025-03-29 12:28:39.907624+05:30'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_updated_at" SET DEFAULT '2025-03-29 12:28:39.907624+05:30'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "u_created_at" SET DEFAULT '2025-03-29 12:28:39.907624+05:30'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_7407ca633f86ae465468368f981"`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_deleted_at" SET DEFAULT '12:28:39.907624+05:30'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_updated_at" SET DEFAULT '12:28:39.907624+05:30'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_created_at" SET DEFAULT '12:28:39.907624+05:30'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_deleted_at" SET DEFAULT '12:28:39.907624+05:30'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_updated_at" SET DEFAULT '12:28:39.907624+05:30'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_created_at" SET DEFAULT '12:28:39.907624+05:30'`);
        await queryRunner.query(`DROP TABLE "student_assignment"`);
        await queryRunner.query(`DROP TABLE "assignment"`);
    }

}
