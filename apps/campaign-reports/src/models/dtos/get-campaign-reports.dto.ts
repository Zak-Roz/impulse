import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { EventNameTypes } from 'apps/common/src/resources/campaign-reports';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationParams } from 'apps/common/src/base/pagination-params.dto';
import { IsDateWithTime } from 'apps/common/src/resources/common/is-date-with-time.decorator';
import { DateHelper } from 'apps/common/src/utils/helpers/date.helper';
import { EnumHelper } from 'apps/common/src/utils/helpers/enum.helper';

export class GetCampaignReportsDto extends PaginationParams {
  @ApiProperty({ type: () => String, required: true, default: DateHelper.getTodayStart() })
  @IsNotEmpty()
  @IsString()
  @IsDateWithTime()
  from_date: string;

  @ApiProperty({ type: () => String, required: true, default: DateHelper.getTodayEnd() })
  @IsNotEmpty()
  @IsString()
  @IsDateWithTime()
  to_date: string;

  @ApiProperty({ type: () => String, required: true, default: EventNameTypes.INSTALL, description: EnumHelper.objToDescription(EventNameTypes) })
  @IsNotEmpty()
  @IsEnum(EventNameTypes)
  event_name: EventNameTypes;
}