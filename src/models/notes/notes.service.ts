import { Inject, Injectable } from "@nestjs/common";
import { INote } from "./interfaces";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { User } from "../users/entities";
import { Note } from "./entities";
import { plainToClass } from "class-transformer";
import { NoteEntity } from "./serializers";

@Injectable()
export class NotesService {
    constructor(
        @Inject(REQUEST) private readonly req: Request
    ) { }

    async createNote(inputs: INote): Promise<NoteEntity> {
        const user: User = this.req.user as User;
        const note: Note = await Note.save({ ...inputs, user: user });
        return plainToClass(NoteEntity, note, { enableImplicitConversion: true, groups: ['user.id'] });
    }
}