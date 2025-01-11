import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigModule } from "src/config/jwt/config.module";
import { JwtConfigService } from "src/config/jwt/config.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            imports: [JwtConfigModule],
            inject: [JwtConfigService],
            useFactory: (jwtConfigSrvice: JwtConfigService) => ({
                secret: jwtConfigSrvice.secret,
                signOptions: { expiresIn: jwtConfigSrvice.expirationMs }
            })
        }),
    ]
})
export class JwtProviderModule { }