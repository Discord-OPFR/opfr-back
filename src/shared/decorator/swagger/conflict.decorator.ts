import { applyDecorators } from '@nestjs/common';
import { ApiConflictResponse } from '@nestjs/swagger';

interface OPFRConflictOptions {
  description?: string;
}

export function DocConflictResponse(options?: OPFRConflictOptions) {
  return applyDecorators(
    ApiConflictResponse({
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { enum: ['Conflict'] },
          statusCode: { enum: [409] },
        },
      },
      description: options?.description,
    }),
  );
}
