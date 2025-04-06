import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Questions } from "./questions.entity";

@Entity({name:"options"})
export class Options{
    @PrimaryGeneratedColumn("uuid",{name:"op_id"})
    opId!:string;

    @Column({name:"option"})
    option!:string;

    @ManyToOne(()=>Questions,(question)=>question.option)
    @JoinColumn({name:"qn_id"})
    question!:Questions;

    @Column({name:"qn_id"})
    questionId!:string;

    @CreateDateColumn({type:"timestamp with time zone",name:"op_created_at"})
    opCreatedAt!:Date;

    @UpdateDateColumn({type:"timestamp with time zone",name:"op_updated_at"})
    opUpdatedAt!:Date;

    @DeleteDateColumn({type:"timestamp with time zone",name:"op_deleted_at",nullable:true})
    opDeletedAt?:Date;
}