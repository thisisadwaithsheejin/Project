import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserLogService } from "src/user/user.log/user.log.service";

@Injectable()
export class UserLoggingMiddleware implements NestMiddleware{
    constructor(private readonly userLogService:UserLogService){}
    async use(req:Request,res:Response,next:NextFunction){
        // Extracting method, originalUrl, and params from the request object
        const {method, originalUrl, params}=req;
        // Constructing log data object
        const UserlogData = {
            // HTTP request method
            method,
            // Full path of the request
            path:originalUrl,
            // ID parameter from the request
            id:params.id
        };
        await this.userLogService.UsercreateLog(UserlogData);
        next();
    }
}