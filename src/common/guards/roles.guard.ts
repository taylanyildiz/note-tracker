import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/models/users/enums";
import { ROLES_META_KEY } from "../constants";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request } from "express";
import { User } from "src/models/users/entities";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const host: HttpArgumentsHost = context.switchToHttp();
        const req: Request = host.getRequest<Request>();
        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_META_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!roles) return true;

        const user = req.user as User | undefined;
        if (!user) return false;

        return roles.some((role) => role == user.role);
    }
}