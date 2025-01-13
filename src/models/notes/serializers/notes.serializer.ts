import { PaginationEntity } from "src/common/decorators/responses";
import { NoteEntity } from "./note.serializer";
import { Expose, Type } from "class-transformer";

export class NotesEntity extends PaginationEntity<NoteEntity> {
    @Expose()
    @Type(() => NoteEntity)
    data: NoteEntity[];
}