import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Assignment } from "../../course_assignment/entity/assignment.entity";

@Entity({name:"student_assignment"})
export class StudentAssignment{
    @PrimaryGeneratedColumn("uuid")
    sa_id!:string;

    @Column()
    sa_upload!:string;

    @ManyToOne(()=>User,(user)=>user.assignment)
    @JoinColumn({name:"u_id"})
    student!:User;

    @ManyToOne(()=>Assignment,(assignment)=>assignment.studentAssignment)
    @JoinColumn({name:"a_id"})
    assignment!:Assignment;

    @CreateDateColumn({type:"time with time zone",default:"NOW()"})
    sa_created_at!:Date;

    @UpdateDateColumn({type:"time with time zone",default:"NOW()"})
    sa_updated_at!:Date;

    @DeleteDateColumn({type:"time with time zone", nullable: true })
    sa_deleted_at?:Date;
}