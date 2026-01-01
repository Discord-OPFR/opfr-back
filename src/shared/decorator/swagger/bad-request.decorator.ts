import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

interface OPFRBadRequestOptions {
  description?: string;
}

export function OPFRBadRequestResponse(options?: OPFRBadRequestOptions) {
  return applyDecorators(
    ApiBadRequestResponse({
      schema: {
        type: 'object',
        properties: {
          message: { type: 'array', items: { type: 'string' } },
          error: { enum: ['Bad Request'] },
          statusCode: { enum: [400] },
        },
      },
      description: options?.description,
    }),
  );
}
