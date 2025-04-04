import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDateType1743735489621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE courses DROP COLUMN c_created_at`);
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN c_created_at timestamp with time zone default now()`)

        await queryRunner.query(`ALTER TABLE courses DROP COLUMN c_updated_at`);
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN c_updated_at timestamp with time zone default now()`)

        await queryRunner.query(`ALTER TABLE courses DROP COLUMN c_deleted_at`);
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN c_deleted_at timestamp with time zone`)

        await queryRunner.query(`ALTER TABLE course_material DROP COLUMN c_mat_created_at`);
        await queryRunner.query(`ALTER TABLE course_material ADD COLUMN c_mat_created_at timestamp with time zone default now()`)

        await queryRunner.query(`ALTER TABLE course_material DROP COLUMN c_mat_updated_at`);
        await queryRunner.query(`ALTER TABLE course_material ADD COLUMN c_mat_updated_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE course_material DROP COLUMN c_mat_deleted_at`);
        await queryRunner.query(`ALTER TABLE course_material ADD COLUMN c_mat_deleted_at timestamp with time zone`)
        
        await queryRunner.query(`ALTER TABLE assignments DROP COLUMN a_created_at`);
        await queryRunner.query(`ALTER TABLE assignments ADD COLUMN a_created_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE assignments DROP COLUMN a_updated_at`);
        await queryRunner.query(`ALTER TABLE assignments ADD COLUMN a_updated_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE assignments DROP COLUMN a_deleted_at`);
        await queryRunner.query(`ALTER TABLE assignments ADD COLUMN a_deleted_at timestamp with time zone`)
        
        await queryRunner.query(`ALTER TABLE options DROP COLUMN op_created_at`);
        await queryRunner.query(`ALTER TABLE options ADD COLUMN op_created_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE options DROP COLUMN op_updated_at`);
        await queryRunner.query(`ALTER TABLE options ADD COLUMN op_updated_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE options DROP COLUMN op_deleted_at`);
        await queryRunner.query(`ALTER TABLE options ADD COLUMN op_deleted_at timestamp with time zone`)
        
        await queryRunner.query(`ALTER TABLE qn_bank DROP COLUMN qb_created_at`);
        await queryRunner.query(`ALTER TABLE qn_bank ADD COLUMN qb_created_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE qn_bank DROP COLUMN qb_updated_at`);
        await queryRunner.query(`ALTER TABLE qn_bank ADD COLUMN qb_updated_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE qn_bank DROP COLUMN qb_deleted_at`);
        await queryRunner.query(`ALTER TABLE qn_bank ADD COLUMN qb_deleted_at timestamp with time zone`)
        
        await queryRunner.query(`ALTER TABLE questions DROP COLUMN qn_created_at`);
        await queryRunner.query(`ALTER TABLE questions ADD COLUMN qn_created_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE questions DROP COLUMN qn_updated_at`);
        await queryRunner.query(`ALTER TABLE questions ADD COLUMN qn_updated_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE questions DROP COLUMN qn_deleted_at`);
        await queryRunner.query(`ALTER TABLE questions ADD COLUMN qn_deleted_at timestamp with time zone`)
        
        await queryRunner.query(`ALTER TABLE student_assignment DROP COLUMN sa_created_at`);
        await queryRunner.query(`ALTER TABLE student_assignment ADD COLUMN sa_created_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE student_assignment DROP COLUMN sa_updated_at`);
        await queryRunner.query(`ALTER TABLE student_assignment ADD COLUMN sa_updated_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE student_assignment DROP COLUMN sa_deleted_at`);
        await queryRunner.query(`ALTER TABLE student_assignment ADD COLUMN sa_deleted_at timestamp with time zone`)
        
        await queryRunner.query(`ALTER TABLE student_score DROP COLUMN sc_created_at`);
        await queryRunner.query(`ALTER TABLE student_score ADD COLUMN sc_created_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE student_score DROP COLUMN sc_updated_at`);
        await queryRunner.query(`ALTER TABLE student_score ADD COLUMN sc_updated_at timestamp with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE student_score DROP COLUMN sc_deleted_at`);
        await queryRunner.query(`ALTER TABLE student_score ADD COLUMN sc_deleted_at timestamp with time zone`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE courses DROP COLUMN c_created_at`);
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN c_created_at time with time zone default now()`)

        await queryRunner.query(`ALTER TABLE courses DROP COLUMN c_updated_at`);
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN c_updated_at time with time zone default now()`)

        await queryRunner.query(`ALTER TABLE courses DROP COLUMN c_deleted_at`);
        await queryRunner.query(`ALTER TABLE courses ADD COLUMN c_deleted_at time with time zone`)

        await queryRunner.query(`ALTER TABLE course_material DROP COLUMN c_mat_created_at`);
        await queryRunner.query(`ALTER TABLE course_material ADD COLUMN c_mat_created_at time with time zone default now()`)

        await queryRunner.query(`ALTER TABLE course_material DROP COLUMN c_mat_updated_at`);
        await queryRunner.query(`ALTER TABLE course_material ADD COLUMN c_mat_updated_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE course_material DROP COLUMN c_mat_deleted_at`);
        await queryRunner.query(`ALTER TABLE course_material ADD COLUMN c_mat_deleted_at time with time zone`)
        
        await queryRunner.query(`ALTER TABLE assignments DROP COLUMN a_created_at`);
        await queryRunner.query(`ALTER TABLE assignments ADD COLUMN a_created_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE assignments DROP COLUMN a_updated_at`);
        await queryRunner.query(`ALTER TABLE assignments ADD COLUMN a_updated_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE assignments DROP COLUMN a_deleted_at`);
        await queryRunner.query(`ALTER TABLE assignments ADD COLUMN a_deleted_at time with time zone`)
        
        await queryRunner.query(`ALTER TABLE options DROP COLUMN op_created_at`);
        await queryRunner.query(`ALTER TABLE options ADD COLUMN op_created_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE options DROP COLUMN op_updated_at`);
        await queryRunner.query(`ALTER TABLE options ADD COLUMN op_updated_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE options DROP COLUMN op_deleted_at`);
        await queryRunner.query(`ALTER TABLE options ADD COLUMN op_deleted_at time with time zone`)
        
        await queryRunner.query(`ALTER TABLE qn_bank DROP COLUMN qb_created_at`);
        await queryRunner.query(`ALTER TABLE qn_bank ADD COLUMN qb_created_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE qn_bank DROP COLUMN qb_updated_at`);
        await queryRunner.query(`ALTER TABLE qn_bank ADD COLUMN qb_updated_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE qn_bank DROP COLUMN qb_deleted_at`);
        await queryRunner.query(`ALTER TABLE qn_bank ADD COLUMN qb_deleted_at time with time zone`)
        
        await queryRunner.query(`ALTER TABLE questions DROP COLUMN qn_created_at`);
        await queryRunner.query(`ALTER TABLE questions ADD COLUMN qn_created_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE questions DROP COLUMN qn_updated_at`);
        await queryRunner.query(`ALTER TABLE questions ADD COLUMN qn_updated_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE questions DROP COLUMN qn_deleted_at`);
        await queryRunner.query(`ALTER TABLE questions ADD COLUMN qn_deleted_at time with time zone`)
        
        await queryRunner.query(`ALTER TABLE student_assignment DROP COLUMN sa_created_at`);
        await queryRunner.query(`ALTER TABLE student_assignment ADD COLUMN sa_created_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE student_assignment DROP COLUMN sa_updated_at`);
        await queryRunner.query(`ALTER TABLE student_assignment ADD COLUMN sa_updated_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE student_assignment DROP COLUMN sa_deleted_at`);
        await queryRunner.query(`ALTER TABLE student_assignment ADD COLUMN sa_deleted_at time with time zone`)
        
        await queryRunner.query(`ALTER TABLE student_score DROP COLUMN sc_created_at`);
        await queryRunner.query(`ALTER TABLE student_score ADD COLUMN sc_created_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE student_score DROP COLUMN sc_updated_at`);
        await queryRunner.query(`ALTER TABLE student_score ADD COLUMN sc_updated_at time with time zone default now()`)
        
        await queryRunner.query(`ALTER TABLE student_score DROP COLUMN sc_deleted_at`);
        await queryRunner.query(`ALTER TABLE student_score ADD COLUMN sc_deleted_at time with time zone`)
    }

}
