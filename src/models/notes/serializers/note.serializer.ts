import { INote } from "../interfaces";
import { NoteStatus } from "../enums";
import { UserEntity } from "src/models/users/serializers";
import { Expose, Transform, Type } from "class-transformer";

export class NoteEntity implements INote {
    @Expose()
    id: number;

    @Expose()
    @Type(() => UserEntity,)
    user: UserEntity;

    @Expose()
    status: NoteStatus;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose({ groups: ['note.timestamp'] })
    createdAt: Date;

    @Expose({ groups: ['note.timestamp'] })
    updatedAt: Date;

    @Expose({ groups: ['note.deletedAt'] })
    deletedAt: Date;
}