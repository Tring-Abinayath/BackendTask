import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteUserAssignmentTable1743277045035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "assignment"`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("u_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "u_email" character varying(50) NOT NULL, "u_password" character varying(8) NOT NULL, "u_role" "public"."user_u_role_enum" NOT NULL DEFAULT 'student', "u_created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "u_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "u_deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT 'NOW()', CONSTRAINT "PK_6849b86df19860994f6ac692814" PRIMARY KEY ("u_id"))`);
        await queryRunner.query(`CREATE TABLE "assignment" ("a_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "a_qn" character varying NOT NULL, "a_upload" character varying NOT NULL, "a_created_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "a_updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "a_deleted_at" TIME WITH TIME ZONE DEFAULT 'NOW()', "c_id" uuid, CONSTRAINT "PK_298c3b2184ef934dcee0eda61e0" PRIMARY KEY ("a_id"))`);

    }

}
