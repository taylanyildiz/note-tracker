import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserEntity } from "src/models/users/serializers";
import { AuthService } from "../auth.service";
import { User } from "src/models/users/entities/user.entity";
import { plainToClass } from "class-transformer";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<UserEntity> {
        const user: User | null = await this.authService.validateUser({ email, password });
        if (!user) throw new UnauthorizedException();
        return plainToClass(UserEntity, user, { groups: ['user.createdAt', 'user.updatedAt'] });
    }
}