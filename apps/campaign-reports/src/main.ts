import { NestFactory } from '@nestjs/core';
import { ConfigService } from 'apps/common/src/utils/config/config.service';
import { appBuilder } from 'apps/common/src/utils/appBuilder/app-builder.provider';
import { CampaignReportsModule } from './campaign-reports.module';

let server;

async function bootstrap() {
  const app = await NestFactory.create(CampaignReportsModule);
  const configService = app.get(ConfigService);

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
