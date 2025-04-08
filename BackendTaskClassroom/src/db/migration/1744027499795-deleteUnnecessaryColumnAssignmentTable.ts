import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteUnnecessaryColumnAssignmentTable1744027499795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE assignments DROP COLUMN a_upload")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE assignments ADD COLUMN a_upload VARCHAR(255)")
    }

}
