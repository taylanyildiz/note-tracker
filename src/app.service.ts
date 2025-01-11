import { Injectable } from '@nestjs/common';
import { AppConfigService } from './config/app/config.service';

@Injectable()
export class AppService {
    constructor(private readonly appConfigService: AppConfigService) { }


    get info(): Record<string, any> {
        return {
            name: this.appConfigService.name,
            version: this.appConfigService.version,
        };
    }
}
