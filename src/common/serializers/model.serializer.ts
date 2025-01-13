import { Expose } from "class-transformer";

export class ModelEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}