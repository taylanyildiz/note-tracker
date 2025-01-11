import { NoteStatus } from "../enums";

export interface INote {
    status: NoteStatus
    name: string;
    description: string;
}