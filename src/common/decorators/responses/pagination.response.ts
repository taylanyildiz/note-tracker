import { Expose } from "class-transformer";
import { Order } from "src/common/enums";
import { Pagination } from "src/common/interfaces";

export class PaginationEntity<T> implements Pagination {
    @Expose()
    readonly data: T[];

    @Expose()
    readonly itemCount: number;

    @Expose()
    readonly order: Order;

    @Expose()
    readonly page: number;

    @Expose()
    readonly take: number;

    get hasPreviousPage(): boolean { return this.page > 1 };

    get hasNextPage(): boolean { return this.page < this.pageCount; }

    get pageCount(): number { return (this.itemCount / this.take) }



}