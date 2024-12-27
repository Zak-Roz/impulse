import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { DATE_WITH_TIME_REGEX } from './constants';

export function IsDateWithTime(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsDateWithTime',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return typeof value === 'string' && DATE_WITH_TIME_REGEX.test(value);
                },
                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} should be valid date in format yyyy-mm-dd hh:mm:ss (2024-12-24 14:21:45)`;
                },
            },
        });
    };
}