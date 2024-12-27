import { ApiProperty } from '@nestjs/swagger';
import { ICampaignReportAggregated } from './campaign-report-aggregated.interface';

export class CampaignReportAggregatedDto implements ICampaignReportAggregated {
    constructor(data: ICampaignReportAggregated) {
        this.ad_id = data.ad_id;
        this.date = data.date;
        this.count = data.count;
    }

    @ApiProperty({ type: () => String, required: true })
    readonly ad_id: string;

    @ApiProperty({ type: () => String, required: true })
    readonly date: string;

    @ApiProperty({ type: () => Number, required: true })
    readonly count: number;
}
