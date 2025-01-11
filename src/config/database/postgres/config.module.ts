import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PostgresConfigService } from "./config.service";
import * as path from 'path';
import configuration from "./configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            envFilePath: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)
        }),
    ],
    providers: [PostgresConfigService],
    exports: [PostgresConfigService],
})
export class PostgresConfigModule { }