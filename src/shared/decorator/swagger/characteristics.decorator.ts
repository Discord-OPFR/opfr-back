import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { CHARACTERISTICS } from '@opfr/definitions';

export function DocCharacteristics() {
  return applyDecorators(
    ApiProperty({
      type: 'object',
      description:
        'Statistiques des caractéristiques. La valeur peut être un nombre unique ou un intervalle [min, max].',
      properties: CHARACTERISTICS.reduce<Record<string, object>>(
        (acc, curr) => {
          acc[curr] = {
            oneOf: [
              { type: 'number' },
              {
                type: 'array',
                items: { type: 'number' },
                minItems: 2,
                maxItems: 2,
              },
            ],
          };
          return acc;
        },
        {},
      ),
      additionalProperties: false,
      example: {
        vitality: 100,
        strength: [10, 20],
        wisdom: 5,
      },
    }),
  );
}
