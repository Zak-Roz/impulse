import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({ type: () => Number, required: true })
    readonly totalCount: number;
    @ApiProperty({ type: () => Number, required: false })
    readonly nextOffset?: number;
    @ApiProperty({ type: () => Number, required: false })
    readonly nextPage?: number;

    constructor(totalCount: number, nextOffset?: number, nextPage?: number) {
        this.nextOffset = nextOffset || undefined;
        this.nextPage = nextPage || undefined;
        this.totalCount = totalCount;
    }
}
