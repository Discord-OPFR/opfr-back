import { applyDecorators } from '@nestjs/common';
import { ApiBadGatewayResponse } from '@nestjs/swagger';

interface OPFRBadGatewayOptions {
  description?: string;
}

export function DocBadGatewayResponse(options?: OPFRBadGatewayOptions) {
  return applyDecorators(
    ApiBadGatewayResponse({
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { enum: ['Bad Gateway'] },
          statusCode: { enum: [502] },
        },
      },
      description: options?.description,
    }),
  );
}
