import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';

interface OPFRNotFoundOptions {
  description?: string;
}

export function DocNotFoundResponse(options?: OPFRNotFoundOptions) {
  return applyDecorators(
    ApiNotFoundResponse({
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { enum: ['Not Found'] },
          statusCode: { enum: [404] },
        },
      },
      description: options?.description,
    }),
  );
}
