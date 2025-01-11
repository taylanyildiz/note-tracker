import { Module } from "@nestjs/common";
import { AppConfigService } from "./config.service";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)
        }),
    ],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule { }