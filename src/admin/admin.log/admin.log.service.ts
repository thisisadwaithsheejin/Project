import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminLog } from '../schemas/admin.log.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminLogService {
    constructor(@InjectModel(AdminLog.name)private adminLogModel:Model<AdminLog>){}
    /**
     * Creates a new admin log entry
     * @param data Partial<AdminLog> Data to create the log entry
     * @returns Promise<AdminLog> Newly created admin log entry
     */
    async admincreateLog(data:Partial<AdminLog>):Promise<AdminLog>{
        //Creating a new instance of AdminLog using the provided data
        const createdLog = new this.adminLogModel(data);
        //saving the newly created log entry to the database
        return createdLog.save();
    }
}