import { AuthGuard } from '@auth/guards/auth.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function ApiAuth() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiUnauthorizedResponse({
      description: 'Authentication failed',
      schema: {
        type: 'object',
        properties: {
          message: { $ref: '#/components/schemas/ERROR_TYPES' },
          error: { enum: ['Unauthorized'] },
          statusCode: { enum: [401] },
        },
      },
    }),
    ApiForbiddenResponse({
      description: 'Insufficient permissions',
      schema: {
        type: 'object',
        properties: {
          message: { $ref: '#/components/schemas/ERROR_TYPES' },
          error: { enum: ['Forbidden'] },
          statusCode: { enum: [403] },
        },
      },
    }),
  );
}
