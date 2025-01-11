import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { NoteStatus } from "../enums";

export class NoteCreateDto {
    @IsOptional()
    @IsEnum(NoteStatus)
    status: NoteStatus;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    description: string;
}