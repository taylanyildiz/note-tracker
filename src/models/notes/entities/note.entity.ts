import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { INote } from "../interfaces";
import { User } from "src/models/users/entities";
import { NoteStatus } from "../enums";

@Entity('notes')
export class Note extends BaseEntity implements INote {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    userId:number;

    @Column('enum', { enum: NoteStatus, default: NoteStatus.PLANNED })
    status: NoteStatus;

    @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column('varchar', { nullable: false, length: 100 })
    name: string;

    @Column('text', { nullable: false })
    description: string;

    @CreateDateColumn({ type: 'time with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'time with time zone' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'time with time zone' })
    deletedAt: Date;
}