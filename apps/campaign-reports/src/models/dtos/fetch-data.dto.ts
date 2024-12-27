import { ApiProperty } from '@nestjs/swagger';
import { IsDateWithTime } from 'apps/common/src/resources/common/is-date-with-time.decorator';
import { DateHelper } from 'apps/common/src/utils/helpers/date.helper';
import { IsNotEmpty, IsString } from 'class-validator';

export class FetchDataDto {
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
}
