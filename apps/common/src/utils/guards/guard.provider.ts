import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

export const guardProviders = [
    {
        provide: APP_GUARD,
        useClass: ThrottlerGuard
    },
];
