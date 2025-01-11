import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/models/users/entities/user.entity";
import { UsersService } from "src/models/users/users.service";
import { ILogin, IRegister, JwtPayload } from "./interfaces";
import { JwtService } from "@nestjs/jwt";
import { plainToClass } from "class-transformer";
import { UserEntity } from "src/models/users/serializers";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(inputs: ILogin): Promise<User | null> {
        const user: User = await this.userService.findByEmail(inputs.email);
        if (!user) return null;
        return user;
    }

    async login(inputs: ILogin): Promise<Record<string, any>> {
        const user: User = await this.userService.findByEmail(inputs.email);
        if (!user) throw new UnauthorizedException('User Not Found');
        const jwtPayload: JwtPayload = { userId: user.id };
        const jwtToken: string = await this.jwtService.sign(jwtPayload);
        return {
            user: plainToClass(UserEntity, user, { groups: ['user.createdAt', 'user.updatedAt'] }),
            accessToken: jwtToken,
        }
    }


    async register(inputs: IRegister): Promise<Record<string, any>> {
        const user: User = await this.userService.findByEmail(inputs.email);
        if (user) throw new ConflictException('Already Email Used');
        const createdUser: User = await this.userService.createUser(inputs);
        const jwtPayload: JwtPayload = { userId: createdUser.id };
        const jwtToken: string = this.jwtService.sign(jwtPayload);
        return {
            user: plainToClass(UserEntity, createdUser, { groups: ['user.createdAt', 'user.updatedAt'] }),
            acessToken: jwtToken,
        };
    }
}