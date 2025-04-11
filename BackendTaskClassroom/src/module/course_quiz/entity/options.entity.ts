import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Questions } from "./questions.entity";
import { dateType } from "../../entityDateType";

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

    @CreateDateColumn({type:dateType,name:"op_created_at"})
    opCreatedAt!:Date;

    @UpdateDateColumn({type:dateType,name:"op_updated_at"})
    opUpdatedAt!:Date;

    @DeleteDateColumn({type:dateType,name:"op_deleted_at",nullable:true})
    opDeletedAt?:Date;
}
