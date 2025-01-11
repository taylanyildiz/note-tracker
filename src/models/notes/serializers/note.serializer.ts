import { INote } from "../interfaces";
import { NoteStatus } from "../enums";
import { ModelEntity } from "src/common/serializers";
import { UserEntity } from "src/models/users/serializers";
import { Expose } from "class-transformer";

export class NoteEntity extends ModelEntity implements INote {
    id: number;

    @Expose()
    user: UserEntity;
    
    status: NoteStatus;

    name: string;
    
    description: string;
}