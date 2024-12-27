
import { DataSource } from 'typeorm';
import { CampaignReport } from './campaign-reports.entity';
import { CAMPAIGN_REPORT_PROVIDE_NAME, DATABASE_PROVIDE_NAME } from 'apps/common/src/resources/common/constants';

export const campaignReportProvider = [
  {
    provide: CAMPAIGN_REPORT_PROVIDE_NAME,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CampaignReport),
    inject: [DATABASE_PROVIDE_NAME],
  },
];
