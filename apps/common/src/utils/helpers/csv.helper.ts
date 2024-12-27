import { parse, ParseResult } from 'papaparse'

export class CSVHelper {
    static parse<T>(csvString: string): ParseResult<T> {
        return parse(csvString, {
            header: true,
            skipEmptyLines: true,
            complete: (res) => res.data,
        });
    }
}
