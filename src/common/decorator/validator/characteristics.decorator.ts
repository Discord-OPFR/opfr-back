import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

import { CHARACTERISTICS } from '@opfr/definitions';

export function IsCharacteristicsValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCharacteristicsValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true; // optional
          if (typeof value !== 'object') return false;

          return Object.entries(value).every(([key, val]) => {
            if (!(key in CHARACTERISTICS)) return false;

            if (typeof val === 'number') return true;
            return (
              Array.isArray(val) &&
              val.length === 2 &&
              val.every(v => typeof v === 'number')
            );
          });
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} doit être un objet avec des clés de type Characteristic et des valeurs number ou [number, number]`;
        },
      },
    });
  };
}
