import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne, Unique } from "typeorm";
import { QnBank } from "../../course_quiz/entity/qn_bank.entity";
import { User } from "../../user/entity/user.entity";

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
    qbId!:String

    @ManyToOne(() => User, (user) => user.scores)
    @JoinColumn({ name: "u_id" })
    userScore!: User;

    @Column({name:"u_id"})
    userId!:String

    @CreateDateColumn({ type: "timestamp with time zone",name:"sc_created_at"})
    scCreatedAt!: Date;

    @UpdateDateColumn({ type: "timestamp with time zone",name:"sc_updated_at", default: "NOW()" })
    scUpdatedAt!: Date;

    @DeleteDateColumn({ type: "timestamp with time zone",name:"sc_deleted_at", nullable: true })
    scDeletedAt?: Date;
}