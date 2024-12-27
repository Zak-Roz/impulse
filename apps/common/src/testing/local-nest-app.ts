import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'apps/common/src/utils/config/config.service';
import { appBuilder } from 'apps/common/src/utils/appBuilder/app-builder.provider';
import { setupSwagger } from 'apps/swagger/src/setup-swagger';
import { SwaggerAppModule } from 'apps/swagger/src/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(SwaggerAppModule);

  const configService = app.get(ConfigService);

  await setupSwagger(app, configService);

  await appBuilder(app, configService);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
