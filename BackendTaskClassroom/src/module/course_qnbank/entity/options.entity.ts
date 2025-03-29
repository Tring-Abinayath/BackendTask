import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Questions } from "./questions.entity";

@Entity({name:"options"})
export class Options{
    @PrimaryGeneratedColumn("uuid")
    op_id!:string;

    @Column()
    option!:string;

    @ManyToOne(()=>Questions,(question)=>question.qn)
    @JoinColumn({name:"qn_id"})
    question!:Questions;

    @CreateDateColumn({type:"time with time zone",default:"NOW()"})
    op_created_at!:Date;

    @UpdateDateColumn({type:"time with time zone",default:"NOW()"})
    op_updated_at!:Date;

    @DeleteDateColumn({type:"time with time zone",nullable:true})
    op_deleted_at?:Date;
}