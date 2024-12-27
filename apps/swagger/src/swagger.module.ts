import { Module } from '@nestjs/common';
import { CampaignReportsModule } from 'apps/campaign-reports/src/campaign-reports.module';

@Module({
  imports: [CampaignReportsModule]
})
export class SwaggerAppModule { }
