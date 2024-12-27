import { PaginationDto } from '../../models/pagination.dto';

export class PaginationHelper {
    static buildPagination(query: { take: number, page: number }, count: number): PaginationDto {
        const nextOffset = query.page * query.take;
        const isNext = nextOffset > count;
        return new PaginationDto(
            count,
            isNext ? undefined : nextOffset,
            isNext ? undefined : query.page + 1,
        );
    }
}
