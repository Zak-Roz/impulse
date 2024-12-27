import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as morgan from 'morgan';
import { LoggerService } from '../logger/logger.service';
import { requestResponseLogger } from '../logger/logger-middleware';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

export const appBuilder = async (app: INestApplication, configService: ConfigService): Promise<INestApplication> => {
    app.enableCors({ origin: JSON.parse(configService.get('CORS_ORIGINS')) });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    app.useLogger(new LoggerService());
    app.use(requestResponseLogger);
    app.use(json({ limit: '10mb' }));
    app.use(urlencoded({ extended: true, limit: '10mb' }));

    app.use(morgan('tiny'));

    app.use(helmet());

    await app.init();
    return app;
};
