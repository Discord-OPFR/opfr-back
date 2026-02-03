import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsDateOrNull(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateOrNull',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return value === null || value instanceof Date;
        },
        defaultMessage() {
          return `${propertyName} must be a date or null`;
        },
      },
    });
  };
}
