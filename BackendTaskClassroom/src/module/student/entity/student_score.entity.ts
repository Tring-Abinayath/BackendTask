import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, Unique } from "typeorm";
import { QnBank } from "../../course_quiz/entity/qn_bank.entity";
import { User } from "../../user/entity/user.entity";
import { dateType } from "../../entityDateType";

@Entity({ name: "student_score" })
@Unique(['qbId','userId'])
export class StudentScore {
    @PrimaryGeneratedColumn("uuid",{name:"sc_id"})
    scId!:string;

    @Column()
    score!: string;

    @ManyToOne(() => QnBank, (qnBank) => qnBank.score)
    @JoinColumn({ name: "qb_id" })
    qnBank!: QnBank;

    @Column({name:"qb_id"})
    qbId!:string

    @ManyToOne(() => User, (user) => user.scores)
    @JoinColumn({ name: "u_id" })
    userScore!: User;

    @Column({name:"u_id"})
    userId!:string

    @CreateDateColumn({ type:dateType,name:"sc_created_at"})
    scCreatedAt!: Date;

    @UpdateDateColumn({ type:dateType,name:"sc_updated_at", default: "NOW()" })
    scUpdatedAt!: Date;

    @DeleteDateColumn({ type:dateType,name:"sc_deleted_at", nullable: true })
    scDeletedAt?: Date;
}
