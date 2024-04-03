import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserLog } from '../schemas/user.log.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserLogService {
    constructor(@InjectModel(UserLog.name)private userLogModel:Model<UserLog>){}
    /**
     * Creates a new user log entry
     * @param data Partial<UserLog> The data to be logged
     * @returns Promise<UserLog> The created user log entry
     */  
    async UsercreateLog(data:Partial<UserLog>):Promise<UserLog>{
    // create a new user log entry
    const createdLog = new this.userLogModel(data);
    return createdLog.save();
    }
}