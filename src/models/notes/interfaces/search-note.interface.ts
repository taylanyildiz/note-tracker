import { PaginationDto } from "src/common/decorators/requests";

export interface ISearchNote extends PaginationDto {
    searchKey: string;
}