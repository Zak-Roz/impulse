export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;
export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

export const DATE_REGEX = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
export const DATE_WITH_TIME_REGEX = /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

export const MIN_PAGINATION_TAKE = 1;
export const DEFAULT_PAGINATION_TAKE = 100;
export const DEFAULT_PAGINATION_PAGE = 1;

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

export const CAMPAIGN_REPORT_PROVIDE_NAME = 'CAMPAIGN_REPORT_REPOSITORY';
export const DATABASE_PROVIDE_NAME = 'DATA_SOURCE';
