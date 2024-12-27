
import { Module } from '@nestjs/common';
import { databaseProvider } from './database.providers';
import { ConfigService } from '../config/config.service';
import { configProvider } from '../config/config.provider';

@Module({
  providers: [databaseProvider, ConfigService, configProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
