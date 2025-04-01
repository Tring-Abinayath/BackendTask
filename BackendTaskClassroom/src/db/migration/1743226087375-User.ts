import { MigrationInterface, QueryRunner } from "typeorm";

export class User1743226087375 implements MigrationInterface {
    name = 'User1743226087375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("u_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "u_email" character varying(50) NOT NULL, "u_password" character varying(8) NOT NULL, "u_role" "public"."user_u_role_enum" NOT NULL DEFAULT 'student', "u_created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "u_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "u_deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT 'NOW()', CONSTRAINT "PK_6849b86df19860994f6ac692814" PRIMARY KEY ("u_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
