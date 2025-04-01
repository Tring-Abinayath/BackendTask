import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { QnBank } from "../../course_qnbank/entity/qn_bank.entity";
import { User } from "../../user/entity/user.entity";

@Entity({ name: "student_score" })
export class StudentScore {
    @PrimaryGeneratedColumn("uuid",{name:"sc_id"})
    scId!:string;

    @Column()
    score!: string;

    @ManyToOne(() => QnBank, (qnBank) => qnBank.question)
    @JoinColumn({ name: "qb_id" })
    qnBank!: QnBank;

    @ManyToOne(() => User, (user) => user.scores)
    @JoinColumn({ name: "u_id" })
    userScore!: User;

    @CreateDateColumn({ type: "timestamp with time zone",name:"sc_created_at"})
    scCreatedAt!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone",name:"sc_updated_at", default: "NOW()" })
    scUpdatedAt!: Date;

    @DeleteDateColumn({ type: "timestamp with time zone",name:"sc_deleted_at", nullable: true })
    scDeletedAt?: Date;
}