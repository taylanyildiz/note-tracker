import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/decorators/requests";
import { ISearchNote } from "../interfaces";

export class SearchNoteDto extends PaginationDto implements ISearchNote {
    @IsString()
    @IsOptional()
    searchKey: string;
}