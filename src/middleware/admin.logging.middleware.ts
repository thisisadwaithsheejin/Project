import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AdminLogService } from 'src/admin/admin.log/admin.log.service';

@Injectable()
export class AdminLoggingMiddleware implements NestMiddleware {
  constructor(private readonly adminLogService: AdminLogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
  //Extracting method , originalUrl , and params from the request object  
    const { method, originalUrl, params } = req;
    //log
    const logData = {
      //HTTP request method
      method,
      //path of the request 
      path:originalUrl,
      //ID 
      id: params.id,
    };
    await this.adminLogService.admincreateLog(logData);
    next();
  }
}
