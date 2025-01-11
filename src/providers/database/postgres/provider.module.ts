import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfigModule } from "src/config/database/postgres/config.module";
import { PostgresConfigService } from "src/config/database/postgres/config.service";
import * as path from 'path';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [PostgresConfigModule],
            inject: [PostgresConfigService],
            useFactory: (postgresConfigService: PostgresConfigService) => ({
                type: 'postgres',
                host: postgresConfigService.host,
                port: postgresConfigService.port,
                username: postgresConfigService.user,
                password: postgresConfigService.password,
                database: postgresConfigService.database,
                migrationsRun: false,
                synchronize: true,
                autoLoadEntities: true,
                entities: [
                    path.join(__dirname, '../../../models/**/entities', '*.entity.{ts,js}'),
                ],
            }),
        })
    ],
})
export class PostgresProviderModule { }