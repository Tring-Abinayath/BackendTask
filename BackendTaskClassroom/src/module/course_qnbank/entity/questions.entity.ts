import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { QnBank } from "./qn_bank.entity";
import { Options } from "./options.entity";

@Entity({name:"questions"})
export class Questions{
    @PrimaryGeneratedColumn("uuid",{name:"qn_id"})
    qnId!:string;

    @Column({name:"qn"})
    qn!:string;

    @ManyToOne(()=>QnBank,(qnBank)=>qnBank.question)
    @JoinColumn({name:"qb_id"})
    qnBank!:QnBank;

    @OneToOne(()=>Options)
    @JoinColumn({name:"answer"})
    answerOption!:Options;

    @OneToMany(()=>Options,(option)=>option.question)
    question!:Options[]

    @CreateDateColumn({type:"timestamp with time zone",name:"qn_created_at"})
    qnCreatedAt!:Date;

    @UpdateDateColumn({type:"timestamp with time zone",name:"qn_updated_at",default:"NOW()"})
    qnUpdatedAt!:Date;

    @DeleteDateColumn({type:"timestamp with time zone",name:"qn_deleted_at", nullable: true })
    qnDeletedAt?:Date;
}