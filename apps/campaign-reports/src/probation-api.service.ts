import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "apps/common/src/utils/config/config.service";
import { EventNameTypes } from "apps/common/src/resources/campaign-reports";
import { CSVHelper } from "apps/common/src/utils/helpers/csv.helper";
import { CampaignReportsService } from "./campaign-reports.service";
import { from, lastValueFrom } from 'rxjs';
import { mergeMap, catchError, toArray } from 'rxjs/operators';
import { LoggerService } from "apps/common/src/utils/logger/logger.service";

@Injectable()
export class ProbationApiService {
  private readonly BASE_URL: string;
  private readonly API_KEY: string;
  private readonly DEFAULT_LIMIT_FOR_ITERATION: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly campaignReportsService: CampaignReportsService,
    private readonly loggerService: LoggerService,
  ) {
    this.BASE_URL = this.configService.get('PROBATION_API_DOMAIN');
    this.API_KEY = this.configService.get('PROBATION_API_KEY');
    this.DEFAULT_LIMIT_FOR_ITERATION = +this.configService.get('DEFAULT_LIMIT_FOR_ITERATION');
  }

  async fetchAllEventsInRange(dateFrom: string, to: string): Promise<void> {
    const eventNames = [EventNameTypes.INSTALL, EventNameTypes.PURCHASE];
  
    const source = from(eventNames).pipe(
      mergeMap(
        (eventName) =>
          from(this.fetchDataForEvent(dateFrom, to, eventName)),
        2,
      ),
      toArray(),
      catchError((error) => {
        this.loggerService.error('Error in fetchAllEventsInRange:', error);
        throw error;
      }),
    );
  
    await lastValueFrom(source);
  }

  async fetchDataForEvent(
    dateFrom: string,
    dateTo: string,
    event: EventNameTypes,
    limit: number = this.DEFAULT_LIMIT_FOR_ITERATION,
  ): Promise<void> {
    let nextPageUrl = this.buildRequestUrl(dateFrom, dateTo, event, limit);
    const headers = { 'x-api-key': this.API_KEY };
    
    do {
      try {
        const response = await lastValueFrom(
          this.httpService.get(nextPageUrl, { headers })
        );

        nextPageUrl = response?.data?.data?.pagination?.next ?? '';

        const { data } = CSVHelper.parse<{ [key: string]: string }>(
          response.data.data.csv
        );

        await this.campaignReportsService.saveReports(data);

      } catch (error) {
        this.loggerService.error(`Error fetching data for event=${event}`, error);
        throw error;
      }
    } while (nextPageUrl);
  }

  private buildRequestUrl(
    from: string,
    to: string,
    event: EventNameTypes,
    limit: number,
  ): string {
    const dateFrom = `from_date=${from}`;
    const dateTo = `to_date=${to}`;
    const eventNameParam = `event_name=${encodeURIComponent(event)}`;
    const takeParam = `take=${limit}`;

    const queryString = [dateFrom, dateTo, eventNameParam, takeParam].join('&');

    return encodeURI(`${this.BASE_URL}/tasks/campaign/reports?${queryString}`);
  }
}