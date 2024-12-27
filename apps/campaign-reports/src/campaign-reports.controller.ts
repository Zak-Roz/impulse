import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { CampaignReportsService } from './campaign-reports.service';
import {
  FetchDataDto,
  ICampaignReportAggregated,
  CampaignReportsAggregatedDto,
  GetCampaignReportsDto,
} from './models/dtos';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationHelper } from 'apps/common/src/utils/helpers/pagination.helper';
import { EmptyDto } from 'apps/common/src/base/empty.dto';
import { ProbationApiService } from './probation-api.service';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('campaign-reports')
@Controller('campaign-reports')
export class CampaignReportsController {
  constructor(
    private readonly campaignReportsService: CampaignReportsService,
    private readonly probationApiService: ProbationApiService
  ) {}

  @ApiOperation({ summary: 'Manual fetch' })
  @ApiOkResponse({ type: () => EmptyDto })
  @HttpCode(HttpStatus.OK)
  @Post('fetch')
  async fetchDataRange(@Body() body: FetchDataDto) {
    await this.probationApiService.fetchAllEventsInRange(body.from_date, body.to_date);

    return new EmptyDto();
  }

  @SkipThrottle()
  @ApiOperation({ summary: 'Get campaign reports (aggregated data)' })
  @ApiOkResponse({ type: () => CampaignReportsAggregatedDto })
  @HttpCode(HttpStatus.OK)
  @Get('aggregate')
  async getAggregatedData(@Query() query: GetCampaignReportsDto) {
    let items: ICampaignReportAggregated[] = [];
    const count = await this.campaignReportsService.getAggregatedCount(query);

    if (count) {
      items = await this.campaignReportsService.getAggregatedData(query);
    }

    return new CampaignReportsAggregatedDto(items, PaginationHelper.buildPagination(query, count));
  }
}
