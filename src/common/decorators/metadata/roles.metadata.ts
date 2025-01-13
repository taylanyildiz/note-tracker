import { SetMetadata } from "@nestjs/common";
import { ROLES_META_KEY } from "src/common/constants";
import { UserRole } from "src/models/users/enums";


export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_META_KEY, roles);