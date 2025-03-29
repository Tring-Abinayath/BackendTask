import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { QnBank } from "./qn_bank.entity";
import { Options } from "./options.entity";

@Entity({name:"questions"})
export class Questions{
    @PrimaryGeneratedColumn("uuid")
    qn_id!:string;

    @Column()
    qn!:string;

    @ManyToOne(()=>QnBank,(qnBank)=>qnBank.question)
    @JoinColumn({name:"qb_id"})
    qnBank!:QnBank;

    @OneToOne(()=>Options)
    @JoinColumn({name:"answer"})
    answer!:Options;

    @OneToMany(()=>Options,(option)=>option.question)
    question!:Options[]

    @CreateDateColumn({type:"time with time zone",default:"NOW()"})
    qn_created_at!:Date;

    @UpdateDateColumn({type:"time with time zone",default:"NOW()"})
    qn_updated_at!:Date;

    @DeleteDateColumn({type:"time with time zone", nullable: true })
    qn_deleted_at?:Date;
}