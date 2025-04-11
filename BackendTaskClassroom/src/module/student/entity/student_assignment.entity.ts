import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Assignment } from "../../course_assignment/entity/assignment.entity";

@Entity({name:"student_assignment"})
export class StudentAssignment{
    @PrimaryGeneratedColumn("uuid",{name:"sa_id"})
    saId!:string;

    @Column({name:"sa_upload"})
    saUpload!:string;

    @ManyToOne(()=>User,(user)=>user.assignment)
    @JoinColumn({name:"u_id"})
    student!:User;
    
    @Column({name:"u_id"})
    userId!:string

    @ManyToOne(()=>Assignment,(assignment)=>assignment.studentAssignment)
    @JoinColumn({name:"a_id"})
    assignment!:Assignment;

    @Column({name:"a_id"})
    assignmentId!:string

    @CreateDateColumn({type:"timestamp with time zone",name:"sa_created_at"})
    saCreatedAt!:Date;

    @UpdateDateColumn({type:"timestamp with time zone",name:"sa_updated_at",default:"NOW()"})
    saUpdatedAt!:Date;

    @DeleteDateColumn({type:"timestamp with time zone",name:"sa_deleted_at", nullable: true })
    saDeletedAt?:Date;
}
