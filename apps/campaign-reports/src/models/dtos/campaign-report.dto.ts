import { ApiProperty } from '@nestjs/swagger';
import { EnumHelper } from 'apps/common/src/utils/helpers/enum.helper';
import { CampaignReport } from '../entities/campaign-reports.entity';
import { EventNameTypes } from 'apps/common/src/resources/campaign-reports';

export class CampaignReportDto {
    constructor(data: CampaignReport) {
        this.id = data.id;
        this.campaign = data.campaign || undefined;
        this.campaign_id = data.campaign_id || undefined;
        this.adgroup = data.adgroup || undefined;
        this.adgroup_id = data.adgroup_id || undefined;
        this.ad = data.ad || undefined;
        this.ad_id = data.ad_id || undefined;
        this.client_id = data.client_id || undefined;
        this.event_name = data.event_name || undefined;
        this.event_time = data.event_time || undefined;
    }

    @ApiProperty({ type: () => Number, required: true })
    readonly id: number;

    @ApiProperty({ type: () => String, required: false })
    readonly campaign?: string;

    @ApiProperty({ type: () => String, required: false })
    readonly campaign_id?: string;

    @ApiProperty({ type: () => String, required: false })
    readonly adgroup?: string;

    @ApiProperty({ type: () => String, required: false })
    readonly adgroup_id?: string;

    @ApiProperty({ type: () => String, required: false })
    readonly ad?: string;

    @ApiProperty({ type: () => String, required: false })
    readonly ad_id?: string;

    @ApiProperty({ type: () => String, required: false })
    readonly client_id?: string;

    @ApiProperty({ type: () => Number, required: false, description: EnumHelper.toDescription(EventNameTypes) })
    readonly event_name?: EventNameTypes;

    @ApiProperty({ type: () => String, required: false })
    readonly event_time?: Date;
}
