import { Injectable } from "@nestjs/common";
import { ConfigGetOptions, ConfigService, Path } from "@nestjs/config";

@Injectable()
export class PostgresConfigService {
    constructor(private readonly configService: ConfigService) { }

    private value<T>(propertyPath: string): T {
        return this.configService.get<T>(`postgres.${propertyPath}`);
    }

    get host(): string {
        return this.value<string>('host');
    }

    get port(): number {
        return Number(this.value<string>('port'));
    }

    get user(): string {
        return this.value<string>('user');
    }

    get password(): string {
        const password = this.configService.get<string>('postgres.password');
        return password;
    }

    get database(): string {
        return this.value<string>('database');
    }
}