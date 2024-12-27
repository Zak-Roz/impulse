import { ApiProperty } from '@nestjs/swagger';
import { CampaignReportDto } from './campaign-report.dto';
import { CampaignReport } from '../entities/campaign-reports.entity';
import { PaginationDto } from 'apps/common/src/models/pagination.dto';

export class CampaignReportsDto {
    constructor(data: CampaignReport[], pagination: PaginationDto) {
        this.pagination = pagination;
        this.data = data.map(item => new CampaignReportDto(item));
    }
    
    @ApiProperty({ type: () => [CampaignReportDto] })
    readonly data: CampaignReportDto[];

    @ApiProperty({ type: () => PaginationDto, required: true })
    readonly pagination: PaginationDto;
}
