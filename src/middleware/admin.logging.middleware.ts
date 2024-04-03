import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AdminLogService } from 'src/admin/admin.log/admin.log.service';

@Injectable()
export class AdminLoggingMiddleware implements NestMiddleware {
  constructor(private readonly adminLogService: AdminLogService) {}
  
  async use(req: Request, res: Response, next: NextFunction) {
    const { method , originalUrl , params } = req;
    const description = `${method} request for ${originalUrl}`;
    const AdminlogData = {
      method,
      path: originalUrl,
      id:params.id,
      description, 
    };
    await this.adminLogService.admincreateLog(AdminlogData);
    next();
  }
}