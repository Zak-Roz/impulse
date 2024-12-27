import { DateTime } from 'luxon';

export class DateHelper {
  /**
   * Returns today's start time as 'yyyy-MM-dd HH:mm:ss'
   * @returns {string}
   */
  static getTodayStart(): string {
    return DateTime.now()
      .startOf('day')
      .toFormat('yyyy-MM-dd HH:mm:ss');
  }

  /**
   * Returns today's end time as 'yyyy-MM-dd HH:mm:ss'
   * @returns {string}
   */
  static getTodayEnd(): string {
    return DateTime.now()
      .endOf('day')
      .toFormat('yyyy-MM-dd HH:mm:ss');
  }

  /**
   * Returns the current time in the specified format (default 'yyyy-MM-dd HH:mm:ss')
   * @param {string} format - Date format
   * @returns {string}
   */
  static getCurrentTime(format: string = 'yyyy-MM-dd HH:mm:ss'): string {
    return DateTime.now().toFormat(format);
  }

  /**
   * Adds days to the current date and returns the result in the specified format
   * @param {number} days - Number of days to add
   * @param {string} format - Date format
   * @returns {string}
   */
  static addDays(days: number, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
    return DateTime.now().plus({ days }).toFormat(format);
  }

  /**
   * Subtracts days from the current date and returns the result in the specified format
   * @param {number} days - Number of days to subtract
   * @param {string} format - Date format
   * @returns {string}
   */
  static subtractDays(days: number, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
    return DateTime.now().minus({ days }).toFormat(format);
  }

  /**
   * Checks if the provided date is valid
   * @param {string} date - Date in ISO format or other supported format
   * @returns {boolean}
   */
  static isValidDate(date: string): boolean {
    return DateTime.fromISO(date).isValid;
  }

  /**
   * Formats the provided date into the specified format
   * @param {string} date - Date in any supported format
   * @param {string} format - Output format
   * @returns {string}
   */
  static formatDate(date: string, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
    return DateTime.fromISO(date).toFormat(format);
  }
}
