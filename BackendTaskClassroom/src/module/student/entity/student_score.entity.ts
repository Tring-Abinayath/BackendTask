import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { QnBank } from "../../course_qnbank/entity/qn_bank.entity";
import { User } from "../../user/entity/user.entity";

@Entity({ name: "student_score" })
export class StudentScore {
    @PrimaryGeneratedColumn("uuid")
    sc_id!:string;

    @Column()
    score!: string;

    @ManyToOne(() => QnBank, (qnBank) => qnBank.question)
    @JoinColumn({ name: "qb_id" })
    qnBank!: QnBank;

    @ManyToOne(() => User, (user) => user.scores)
    @JoinColumn({ name: "u_id" })
    user_score!: User;

    @CreateDateColumn({ type: "time with time zone", default: "NOW()" })
    sc_created_at!: Date;

    @UpdateDateColumn({ type: "time with time zone", default: "NOW()" })
    sc_updated_at!: Date;

    @DeleteDateColumn({ type: "time with time zone", nullable: true })
    sc_deleted_at?: Date;
}