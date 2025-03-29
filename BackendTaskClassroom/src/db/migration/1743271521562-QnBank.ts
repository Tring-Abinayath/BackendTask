import { MigrationInterface, QueryRunner } from "typeorm";

export class QnBank1743271521562 implements MigrationInterface {
    name = 'QnBank1743271521562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_assignment" DROP CONSTRAINT "FK_f0baee8c8bda1049ef3d7ff51fc"`);
        await queryRunner.query(`ALTER TABLE "student_assignment" DROP CONSTRAINT "FK_9b7c3b47bf92f69eb0bcaa9b199"`);
        await queryRunner.query(`CREATE TABLE "options" ("op_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "option" character varying NOT NULL, "op_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "op_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "op_deleted_at" TIME WITH TIME ZONE, "qn_id" uuid, CONSTRAINT "PK_8da5ed92701bdfd987a3e84a516" PRIMARY KEY ("op_id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("qn_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qn" character varying NOT NULL, "qn_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "qn_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "qn_deleted_at" TIME WITH TIME ZONE, "qb_id" uuid, "answer" uuid, CONSTRAINT "REL_1f5029626ee39bc0ce382a3fea" UNIQUE ("answer"), CONSTRAINT "PK_565759cb0a6196e3b30acb3157c" PRIMARY KEY ("qn_id"))`);
        await queryRunner.query(`CREATE TABLE "qn_bank" ("qb_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qb_name" character varying(30) NOT NULL, "qb_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "qb_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "qb_deleted_at" TIME WITH TIME ZONE, "c_id" uuid, CONSTRAINT "PK_5f6e6271d75e0eda125cfb0ab05" PRIMARY KEY ("qb_id"))`);
        await queryRunner.query(`CREATE TABLE "assignments" ("a_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "a_qn" character varying NOT NULL, "a_upload" character varying NOT NULL, "a_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "a_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "a_deleted_at" TIME WITH TIME ZONE, "c_id" uuid, CONSTRAINT "PK_89322b93564d3212666e6579cb0" PRIMARY KEY ("a_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_u_role_enum" AS ENUM('admin', 'student')`);
        await queryRunner.query(`CREATE TABLE "users" ("u_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "u_email" character varying(50) NOT NULL, "u_password" character varying(8) NOT NULL, "u_role" "public"."users_u_role_enum" NOT NULL DEFAULT 'student', "u_created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "u_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "u_deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_a9e357fb19ff8358a955cebb92d" UNIQUE ("u_email"), CONSTRAINT "PK_ed9eff0c241ae28139f2e55d3e5" PRIMARY KEY ("u_id"))`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "PK_565759cb0a6196e3b30acb3157c"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn_id"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn_created_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn_updated_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn_deleted_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "REL_1f5029626ee39bc0ce382a3fea"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "answer"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "PK_565759cb0a6196e3b30acb3157c" PRIMARY KEY ("qn_id")`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn_deleted_at" TIME WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "answer" uuid`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "UQ_1f5029626ee39bc0ce382a3fea0" UNIQUE ("answer")`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "sc_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "PK_565759cb0a6196e3b30acb3157c"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "PK_5319b998b7c3fb18f4c9b317977" PRIMARY KEY ("qn_id", "sc_id")`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "score" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "sc_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "sc_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "sc_deleted_at" TIME WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "u_id" uuid`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_deleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_deleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ALTER COLUMN "sa_created_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ALTER COLUMN "sa_updated_at" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ALTER COLUMN "sa_deleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_f34406344c6f5d1dc48352b42ea" FOREIGN KEY ("qn_id") REFERENCES "questions"("qn_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_f20c74dc552dc7107dd8f3da15b" FOREIGN KEY ("qb_id") REFERENCES "qn_bank"("qb_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_1f5029626ee39bc0ce382a3fea0" FOREIGN KEY ("answer") REFERENCES "options"("op_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_a69a567c7a60870381b34cb9152" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "qn_bank" ADD CONSTRAINT "FK_d2d9f5f5cc3abcad21272a28af9" FOREIGN KEY ("c_id") REFERENCES "courses"("c_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD CONSTRAINT "FK_ca2d315ba939c105a373f56231d" FOREIGN KEY ("c_id") REFERENCES "courses"("c_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ADD CONSTRAINT "FK_f0baee8c8bda1049ef3d7ff51fc" FOREIGN KEY ("u_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ADD CONSTRAINT "FK_9b7c3b47bf92f69eb0bcaa9b199" FOREIGN KEY ("a_id") REFERENCES "assignments"("a_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_assignment" DROP CONSTRAINT "FK_9b7c3b47bf92f69eb0bcaa9b199"`);
        await queryRunner.query(`ALTER TABLE "student_assignment" DROP CONSTRAINT "FK_f0baee8c8bda1049ef3d7ff51fc"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "FK_ca2d315ba939c105a373f56231d"`);
        await queryRunner.query(`ALTER TABLE "qn_bank" DROP CONSTRAINT "FK_d2d9f5f5cc3abcad21272a28af9"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_a69a567c7a60870381b34cb9152"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_1f5029626ee39bc0ce382a3fea0"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_f20c74dc552dc7107dd8f3da15b"`);
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_f34406344c6f5d1dc48352b42ea"`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ALTER COLUMN "sa_deleted_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ALTER COLUMN "sa_updated_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ALTER COLUMN "sa_created_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_deleted_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_updated_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "c_created_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_deleted_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_updated_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "course_material" ALTER COLUMN "c_mat_created_at" SET DEFAULT '16:06:13.093436+05:30'`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "u_id"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "sc_deleted_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "sc_updated_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "sc_created_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "score"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "PK_5319b998b7c3fb18f4c9b317977"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "PK_565759cb0a6196e3b30acb3157c" PRIMARY KEY ("qn_id")`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "sc_id"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "UQ_1f5029626ee39bc0ce382a3fea0"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "answer"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn_deleted_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn_updated_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn_created_at"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "PK_565759cb0a6196e3b30acb3157c"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "qn_id"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "answer" uuid`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "REL_1f5029626ee39bc0ce382a3fea" UNIQUE ("answer")`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn_deleted_at" TIME WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "qn_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "PK_565759cb0a6196e3b30acb3157c" PRIMARY KEY ("qn_id")`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_u_role_enum"`);
        await queryRunner.query(`DROP TABLE "assignments"`);
        await queryRunner.query(`DROP TABLE "qn_bank"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "options"`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ADD CONSTRAINT "FK_9b7c3b47bf92f69eb0bcaa9b199" FOREIGN KEY ("a_id") REFERENCES "assignment"("a_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_assignment" ADD CONSTRAINT "FK_f0baee8c8bda1049ef3d7ff51fc" FOREIGN KEY ("u_id") REFERENCES "user"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
