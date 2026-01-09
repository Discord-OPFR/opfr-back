import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

interface NumberOrTupleOptions {
  description?: string;
  exampleValue?: number;
  exampleRange?: [number, number];
  required?: boolean;
}

export function DocNumberOrTuple(options?: NumberOrTupleOptions) {
  return applyDecorators(
    ApiProperty({
      description: options?.description || 'Number or Tuple',
      required: options?.required ?? true,
      type: 'number',
      oneOf: [
        { type: 'number', example: options?.exampleValue ?? 30 },
        {
          type: 'array',
          items: { type: 'number' },
          maxItems: 2,
          minItems: 2,
          example: options?.exampleRange ?? [10, 20],
        },
      ],
    }),
  );
}
