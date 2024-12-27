import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { DATE_REGEX } from './constants';

export function IsOnlyDate(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsOnlyDate',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return typeof value === 'string' && DATE_REGEX.test(value);
                },
                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} should be valid date in format yyyy-mm-dd`;
                },
            },
        });
    };
}