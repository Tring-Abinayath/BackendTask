import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from "typeorm";
import { StudentAssignment } from "../../student/entity/student_assignment.entity";
import { StudentScore } from "../../student/entity/student_score.entity";

export enum userRole {
  Admin = "admin",
  Student = "student"
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid",{name:"u_id"})
  uId!: string;

  @Column({ type: "varchar", length: 50, unique: true, name:"u_email"})
  uEmail!: string;

  @Column({ type: "varchar", length: 255,name:"u_password" })
  uPassword!: string;

  @Column({
    type: "enum",
    enum: userRole,
    default: userRole.Student,
    name:"u_role"
  })
  uRole!: userRole;

  @OneToMany(() => StudentAssignment, (assignment) => assignment.student)
  assignment!: StudentAssignment[];

  @OneToMany(() => StudentScore, (score) => score.userScore)
  scores!: StudentScore[];

  @CreateDateColumn({ type: "timestamp with time zone",name:"u_created_at"})
  uCreatedAt!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone",name:"u_updated_at"})
  uUpdatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp with time zone",name:"u_deleted_at", nullable: true })
  uDeletedAt?: Date;
}
