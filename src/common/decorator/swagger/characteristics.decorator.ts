import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';

import { CHARACTERISTICS } from '@opfr/definitions';

export function ApiCharacteristics() {
  return applyDecorators(
    ApiProperty({
      type: 'object',
      description:
        'Statistiques des caractéristiques. La valeur peut être un nombre unique ou un intervalle [min, max].',
      properties: CHARACTERISTICS.reduce(
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
        {} as Record<string, SchemaObjectMetadata>,
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
