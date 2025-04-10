import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueConstraintForScoreTable1743974614564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE student_score ADD CONSTRAINT qb_user_unique UNIQUE(qb_id, u_id);")

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE student_score DROP CONSTRAINT qb_user_unique UNIQUE(qb_id, u_id);")

    }

}
