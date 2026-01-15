import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

interface OPFRBadRequestOptions {
  description?: string;
}

export function DocBadRequestResponse(options?: OPFRBadRequestOptions) {
  return applyDecorators(
    ApiBadRequestResponse({
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { enum: ['Bad Request'] },
          statusCode: { enum: [400] },
        },
      },
      description: options?.description,
    }),
  );
}
