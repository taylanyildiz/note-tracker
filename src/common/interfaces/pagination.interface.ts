import { Order } from "../enums";

export interface Pagination {
    order: Order;
    page: number;
    take: number;
}