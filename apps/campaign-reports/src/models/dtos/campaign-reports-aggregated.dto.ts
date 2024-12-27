import { ApiProperty } from '@nestjs/swagger';
import { CampaignReportAggregatedDto } from './campaign-report-aggregated.dto';
import { PaginationDto } from 'apps/common/src/models/pagination.dto';
import { ICampaignReportAggregated } from './campaign-report-aggregated.interface';

export class CampaignReportsAggregatedDto {
    constructor(data: ICampaignReportAggregated[], pagination: PaginationDto) {
        this.data = data.map(item => new CampaignReportAggregatedDto(item));
        this.pagination = pagination;
    }
    
    @ApiProperty({ type: () => [CampaignReportAggregatedDto] })
    readonly data: CampaignReportAggregatedDto[];

    @ApiProperty({ type: () => PaginationDto, required: true })
    readonly pagination: PaginationDto;
}
