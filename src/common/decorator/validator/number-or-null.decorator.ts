import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsNumberOrNull(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNumberOrNull',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return value === null || typeof value === 'number';
        },
        defaultMessage() {
          return `${propertyName} must be a number or null`;
        },
      },
    });
  };
}
