import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminLog } from '../schemas/admin.log.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminLogService {
    constructor(@InjectModel(AdminLog.name)private adminLogModel:Model<AdminLog>){}
    /**
     * creates a new admin log entry
     * @param data 
     * @returns 
     */
    async admincreateLog(data:Partial<AdminLog>):Promise<AdminLog>{
        const createdLog = new this.adminLogModel(data);
        return createdLog.save();
    }
}
