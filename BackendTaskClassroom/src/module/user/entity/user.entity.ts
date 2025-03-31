import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { StudentAssignment } from "../../student/entity/student_assignment.entity";
import { StudentScore } from "../../student/entity/student_score.entity";

export enum userRole {
  Admin = "admin",
  Student = "student"
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  u_id!: string;

  @Column({ type: "varchar", length: 50, unique: true })
  u_email!: string;

  @Column({ type: "varchar", length: 255 })
  u_password!: string;

  @Column({
    type: "enum",
    enum: userRole,
    default: userRole.Student
  })
  u_role!: userRole;

  @OneToMany(() => StudentAssignment, (assignment) => assignment.student)
  assignment!: StudentAssignment[];

  @OneToMany(() => StudentScore, (score) => score.user_score)
  scores!: StudentScore[];

  @CreateDateColumn({ type: "timestamp with time zone", default: 'NOW()' })
  u_created_at!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", default: 'NOW()' })
  u_updated_at!: Date;

  @DeleteDateColumn({ type: "timestamp with time zone", nullable: true })
  u_deleted_at?: Date;
}
