import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from 'apps/common/src/utils/logger/logger.service';
import { DateHelper } from 'apps/common/src/utils/helpers/date.helper';
import { ProbationApiService } from './probation-api.service';

@Injectable()
export class CampaignReportsScheduler {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly probationApiService: ProbationApiService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.loggerService.debug('Start fetching data from Probation API (cron job).');

    const beginningOfToday = DateHelper.getTodayStart();
    const endOfToday = DateHelper.getTodayEnd();

    try {
      await this.probationApiService.fetchAllEventsInRange(beginningOfToday, endOfToday);
    } catch (error) {
      this.loggerService.error(error);
    }
  }
}
