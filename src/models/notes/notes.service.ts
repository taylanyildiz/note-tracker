import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { INote, ISearchNote } from "./interfaces";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { User } from "../users/entities";
import { Note } from "./entities";
import { plainToInstance } from "class-transformer";
import { NoteEntity, NotesEntity } from "./serializers";
import { Like } from "typeorm";

@Injectable()
export class NotesService {
    constructor(
        @Inject(REQUEST) private readonly req: Request
    ) { }

    async createNote(inputs: INote): Promise<NoteEntity> {
        const user: User = this.req.user as User;
        const note: Note = await Note.save({ ...inputs, user: user });
        return plainToInstance(NoteEntity, note, {
            groups: ['user.id', 'note.timestamp'],
        });
    }

    async deleteNote(id: number): Promise<void> {
        const note = await Note.findOneBy({ id });
        if (!note) throw new NotFoundException();
        await Note.delete({ id });
    }

    async getNote(id: number) {
        const note = await Note.findOne({ where: { id }, relations: { user: true } });
        if (!note) throw new NotFoundException();
        return {
            note: plainToInstance(NoteEntity, note, {
                enableImplicitConversion: true,
                groups: ['user.id']
            })
        };
    }

    async getNotes(items: ISearchNote): Promise<any> {
        const [notes, itemCount] = await Note.findAndCount({
            where: {
                name: items.searchKey && Like(`%${items.searchKey}%`),
            },
            relations: { user: true },
            take: items.take,
            skip: items.skip,
            order: {
                createdAt: items.order,
            }
        });

        const entity: NotesEntity = plainToInstance(NotesEntity, { itemCount, data: notes, ...items });
        return entity;
    }
}