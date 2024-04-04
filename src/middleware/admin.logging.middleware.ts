import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AdminLogService } from 'src/admin/admin.log/admin.log.service';

@Injectable()
export class AdminLoggingMiddleware implements NestMiddleware {
  constructor(private readonly adminLogService: AdminLogService) {}
  //Middleware function to handle logging of admin actions
  async use(req: Request, res: Response, next: NextFunction) {
    //Extracting HTTP method and URL from the request
    const { method , originalUrl } = req;
    //Initialize description variable
    let description ='';
    //Extracting admin ID from URL if available
    const idMatch = originalUrl.match(/\/admin\/([^/]+)/);
    const id = idMatch?idMatch[1]:undefined;
    //switch case to determine the description based on the HTTP method
    switch(method){
      case 'GET':
        if(originalUrl==='/admin'){
          description = 'GET request for all Admins';
        }
        else{
          description = `GET request for a particular Admin ${id}`;
        }
        break;
        case 'POST':
          description = 'POST request to create a new Admin';
          break;
        case 'PUT':
          description = `PUT request to update Admin ${id}`;
          break;
        case 'DELETE':
          description = `DELETE request to delete Admin ${id}`;
          break;
        default:
          description = 'UNKNOWN REQUEST' 
    }
    //creating data object to be logged
    const AdminlogData = {
      method,
      path: originalUrl,
      id,
      description, 
    };
    await this.adminLogService.admincreateLog(AdminlogData);
    next();
  }
}