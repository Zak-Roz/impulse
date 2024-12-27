import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_PROVIDE_NAME } from './config.provider';

@Injectable()
export class ConfigService {
  private readonly envConfig: any;

  constructor(
    @Inject(CONFIG_PROVIDE_NAME) private config: any
  ) {
    this.envConfig = config;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}