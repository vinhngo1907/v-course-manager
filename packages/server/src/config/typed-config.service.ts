import {Injectable} from '@nestjs/common';
import {ConfigService as NestConfigService} from '@nestjs/config';
import { AppConfig } from 'src/common/types/app-config';

@Injectable()
export class TypedConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.configService.get<AppConfig[K]>(key)!;
  }
}
