import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseService } from 'apps/common/src/base/base.service';
import { GetCampaignReportsDto, ICampaignReportAggregated } from './models/dtos';
import { CampaignReport } from './models/entities';
import { TranslatorService } from 'nestjs-translator';
import { CAMPAIGN_REPORT_PROVIDE_NAME } from 'apps/common/src/resources/common/constants';

@Injectable()
export class CampaignReportsService extends BaseService<CampaignReport> {

  constructor(
    @Inject(CAMPAIGN_REPORT_PROVIDE_NAME)
    private readonly campaignReportRepository: Repository<CampaignReport>,
    private readonly translator: TranslatorService,
  ) {
    super(campaignReportRepository);
  }

  private createBaseQuery(
    eventName: string,
    from: string,
    to: string,
  ) {
    return this.campaignReportRepository
      .createQueryBuilder('cr')
      .select("TO_CHAR(cr.event_time, 'YYYY-MM-DD')", 'date')
      .addSelect('cr.ad_id', 'ad_id')
      .where('cr.event_name = :eventName', { eventName })
      .andWhere('cr.event_time >= :from', { from })
      .andWhere('cr.event_time <= :to', { to })
      .groupBy("TO_CHAR(cr.event_time, 'YYYY-MM-DD')")
      .addGroupBy('cr.ad_id');
  }

  async getAggregatedCount(query: GetCampaignReportsDto) {
    const { from_date, to_date, event_name } = query;

    // Since .getCount() with groupBy in Postgres can sometimes yield inaccurate results,
    const countRows = await this.createBaseQuery(event_name, from_date, to_date).getRawMany();

    return countRows.length;
  }

  async getAggregatedData(query: GetCampaignReportsDto) {
    const { from_date, to_date, event_name, take, page } = query;
    const skip = (page - 1) * take;

    const items: ICampaignReportAggregated[] = await this.createBaseQuery(event_name, from_date, to_date)
      .addSelect('COUNT(*)::int', 'count')
      .orderBy('date', 'ASC')
      .addOrderBy('ad_id', 'ASC')
      .offset(skip)
      .limit(take)
      .getRawMany();

    return items;
  }

  async saveReports(reports: { [key: string]: string }[]) {
    try {
      await this.campaignReportRepository.upsert(reports, {
        conflictPaths: ['event_time', 'client_id', 'event_name'],
        skipUpdateIfNoValuesChanged: true,
        upsertType: 'on-conflict-do-update',
      });
    } catch (error) {
      throw new InternalServerErrorException({
        message: this.translator.translate('DATABASE_ERROR_CONFIGURATION'),
        errorCode: 'DATABASE_ERROR_CONFIGURATION',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      });
    }
  }
}
