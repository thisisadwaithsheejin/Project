import { Injectable, NestMiddleware, Request } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class AdminLoggingMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
