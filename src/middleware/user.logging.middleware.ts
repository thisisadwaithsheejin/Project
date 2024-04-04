import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserLogService } from "src/user/user.log/user.log.service";

@Injectable()
export class UserLoggingMiddleware implements NestMiddleware{
    constructor(private readonly userLogService:UserLogService){}
    async use(req:Request,res:Response,next:NextFunction){
        // Extracting method, originalUrl, and params from the request object
        const {method, originalUrl}=req;
        let description='';
        const idMatch = originalUrl.match(/\user\/([^/]+)/)
        const id=idMatch?idMatch[1]:undefined;
        //switch case to determine the description based on the HTTP method
        switch(method){
            case 'GET':
                if(originalUrl==='/user'){
                    description = 'GET request for all Users';
                }
                else{
                    description = `GET request for a particular User ${id}`;
                }
                break;
                case 'POST':
                    description = `POST request to create a new User`;
                    break;
                case 'PUT':
                    description = `PUT request to update User ${id}`;
                    break;
                case 'DELETE':
                    description = `DELETE request to delete User ${id}`;
                    break;
                default:
                    description = 'UNKNOWN REQUEST'
        }
        const UserlogData = {
            // HTTP request method
            method,
            // Full path of the request
            path:originalUrl,
            // ID parameter from the request
            id,
            //Description for the method
            description,
        };
        await this.userLogService.UsercreateLog(UserlogData);
        next();
    }
}