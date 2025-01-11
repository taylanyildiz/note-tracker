import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) { }


    get name(): string {
        return this.configService.get<string>('app.name');
    }

    get host(): string {
        return this.configService.get<string>('app.host');
    }

    get port(): number {
        return Number(this.configService.get<string>('app.port'));
    }

    get version(): string {
        return this.configService.get<string>('app.version');
    }
}