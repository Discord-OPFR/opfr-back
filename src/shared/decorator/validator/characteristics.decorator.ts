import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

import { CHARACTERISTICS } from '@opfr/definitions';
import { recordToArray } from '@opfr/utils-lang';

export function IsCharacteristicsValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCharacteristicsValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!value) return true;
          if (typeof value !== 'object') return false;

          return recordToArray(value).every(([key, val]: [string, unknown]) => {
            if (!(CHARACTERISTICS as readonly string[]).includes(key))
              return false;

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
