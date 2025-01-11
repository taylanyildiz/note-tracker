import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as path from 'path';
import configuration from "./configuration";
import { JwtConfigService } from "./config.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)
        })
    ],
    providers: [JwtConfigService],
    exports: [JwtConfigService]
})
export class JwtConfigModule { }