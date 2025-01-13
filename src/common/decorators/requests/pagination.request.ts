import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { DEFAULT_ORDER, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "src/common/constants";
import { Order } from "src/common/enums";
import { Pagination } from "src/common/interfaces";

export class PaginationDto implements Pagination {
    @IsEnum(Order)
    @IsOptional()
    readonly order: Order = DEFAULT_ORDER;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = DEFAULT_PAGE;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(MAX_PAGE_SIZE)
    take: number = DEFAULT_PAGE_SIZE;

    get skip(): number {
        return (this.page - 1) * this.page;
    }
}