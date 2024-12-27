import { ConfigService } from '../config/config.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { DynamicModule } from '@nestjs/common';

export const throttlerModuleInstance: DynamicModule = ThrottlerModule.forRootAsync({
  useFactory: async (configService: ConfigService) => ({
    throttlers: [{
      ttl: +configService.get('THROTTLER_TTL'),
      limit: +configService.get('THROTTLER_LIMIT')
    }]
  }),
  inject: [ConfigService]
})
