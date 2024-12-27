import { Module } from '@nestjs/common';
import { CampaignReportsController } from './campaign-reports.controller';
import { CampaignReportsService } from './campaign-reports.service';
import { DatabaseModule } from 'apps/common/src/utils/database/database.module';
import { campaignReportProvider } from './models/entities';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from 'apps/common/src/utils/config/config.module';
import { LoggerModule } from 'apps/common/src/utils/logger/logger.module';
import { CSVHelper } from 'apps/common/src/utils/helpers/csv.helper';
import { ScheduleModule } from '@nestjs/schedule';
import { ProbationApiService } from './probation-api.service';
import { CampaignReportsScheduler } from './campaign-reports.scheduler';
import { throttlerModuleInstance } from 'apps/common/src/utils/throttler/throttler.providers';
import { guardProviders } from 'apps/common/src/utils/guards/guard.provider';
import { translatorInstance } from 'apps/common/src/utils/translator/translator.provider';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    LoggerModule,
    HttpModule,
    ScheduleModule.forRoot(),
    throttlerModuleInstance,
    translatorInstance,
  ],
  controllers: [CampaignReportsController],
  providers: [
    ...guardProviders,
    ...campaignReportProvider,
    CampaignReportsService,
    CSVHelper,
    ProbationApiService,
    CampaignReportsScheduler,
  ],
})
export class CampaignReportsModule {}
