import { Min, Max, IsInt, IsNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_PAGINATION_TAKE, DEFAULT_PAGINATION_PAGE, MIN_PAGINATION_TAKE } from '../resources/common/constants';

export class PaginationParams {
  @ApiProperty({ type: () => Number, required: true, default: DEFAULT_PAGINATION_TAKE })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(MIN_PAGINATION_TAKE)
  @Max(DEFAULT_PAGINATION_TAKE)
  @Transform(({ value }) => Number(value))
  readonly take: number = DEFAULT_PAGINATION_TAKE;

  @ApiProperty({ type: () => Number, required: true, default: DEFAULT_PAGINATION_PAGE })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(DEFAULT_PAGINATION_PAGE)
  @Transform(({ value }) => Number(value))
  readonly page: number = DEFAULT_PAGINATION_PAGE;
}
