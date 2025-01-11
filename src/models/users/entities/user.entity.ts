import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUser } from "../interfaces";
import { UserRole } from "../enums";
import { Note } from "src/models/notes/entities";

@Entity('users')
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('enum', { nullable: false, enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column('bool', { nullable: false, default: false })
    status: boolean;

    @Column('varchar', { nullable: false, length: 100 })
    firstName: string;

    @Column('varchar', { nullable: false, length: 100 })
    lastName: String;

    @Column('text', { unique: true, nullable: false })
    email: string;

    @Column('text', { nullable: false })
    password: string;

    @CreateDateColumn({ type: 'time with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'time with time zone' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'time with time zone' })
    deletedAt: Date;

    @OneToMany(() => Note, (note) => note.user, { cascade: true })
    notes: Note[];
}