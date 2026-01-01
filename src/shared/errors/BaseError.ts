import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseError extends HttpException {
  protected constructor(status: HttpStatus, message: string, error: string) {
    super({ message, error, status }, status);
  }
}
