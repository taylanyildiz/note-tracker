import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthStrategy } from "./strategies";
import { UsersModule } from "src/models/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtConfigModule } from "src/config/jwt/config.module";

@Module({
    imports: [JwtConfigModule, PassportModule, UsersModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthStrategy,
        JwtStrategy,
    ]
})
export class AuthModule { }