import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsNumberOrTuple(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNumberOrTuple',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'number') return true;
          if (Array.isArray(value) && value.length === 2) {
            return value.every(v => typeof v === 'number');
          }
          return false;
        },
        defaultMessage() {
          return `${propertyName} must be a number or a tuple of two numbers`;
        },
      },
    });
  };
}
