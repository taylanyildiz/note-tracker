import { ModelEntity } from "src/common/serializers";
import { IUser } from "../interfaces";
import { UserRole } from "../enums";
import { Expose } from "class-transformer";

export const userAdminSerializing: string[] = [
    'admin'
];

export class UserEntity extends ModelEntity implements IUser {
    @Expose({ groups: ['admin', 'user.id'] })
    id: number;

    @Expose()
    role: UserRole;

    @Expose({ groups: ['admin', 'user.status'] })
    status: boolean;

    @Expose()
    firstName: string;

    @Expose()
    lastName: String;

    @Expose()
    email: string;

    @Expose({ groups: ['admin', 'user.status'] })
    password: string;

    @Expose({ groups: ['admin', 'user.createdAt'] })
    createdAt: Date;

    @Expose({ groups: ['admin', 'user.updatedAt'] })
    updatedAt: Date;

    @Expose({ groups: ['admin', 'user.deletedAt'] })
    deletedAt: Date;
}