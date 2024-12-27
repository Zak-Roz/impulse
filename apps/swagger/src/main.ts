import { NestFactory } from '@nestjs/core';
import { SwaggerAppModule } from './swagger.module';
import { setupSwagger } from './setup-swagger';
import { ConfigService } from 'apps/common/src/utils/config/config.service';
import { appBuilder } from 'apps/common/src/utils/appBuilder/app-builder.provider';

let server;

async function bootstrap() {
  if (process.env.NODE_ENV === 'prod') {
    return;
  }

  const app = await NestFactory.create(SwaggerAppModule);
  const configService = app.get(ConfigService);

  await setupSwagger(app, configService);

  await appBuilder(app, configService);

  return app.listen(process.env.PORT ?? 3000);
}

export const handler = async (
  event: any,
  context: any,
  callback: any,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
