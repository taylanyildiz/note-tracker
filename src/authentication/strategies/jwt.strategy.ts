import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfigService } from "src/config/jwt/config.service";
import { JwtPayload } from "../interfaces";
import { UsersService } from "src/models/users/users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/models/users/entities";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly jwtConfigService: JwtConfigService,
        private readonly userService: UsersService,
    ) {
        super({
            ignoreExpiration: false,
            secretOrKey: jwtConfigService.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.userService.findById(payload.userId);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}