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
      //When GET request is called
      case 'GET':
        if(originalUrl==='/admin'){
          description = 'GET request for all Admins';6
        }
        else{
          //When GET request when particular ID is called
          description = `GET request for a particular Admin ${id}`;
        }
        break;
          //When POST request is called 
        case 'POST':
          description = 'POST request to create a new Admin';
          break;
        case 'PUT':
          //When PUT request is called
          description = `PUT request to update Admin ${id}`;
          break;
          //When DELETE request is called 
        case 'DELETE':
          description = `DELETE request to delete Admin ${id}`;
          break;
        default:
          //When None of the above request is called
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