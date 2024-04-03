import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class AdminLog extends Document{
    
    @Prop()
    //ID of the admin
    id:string;

    @Prop()
    //path of the request
    path:string;

    @Prop()
    //HTTP request method (GET,POST,PUT,DELETE)
    method:string;

    //Date and time when the log entry was created 
    @Prop({type:Date,default:Date.now})
    date:Date;

    @Prop()
    description:string;
}
export const AdminLogSchema = SchemaFactory.createForClass(AdminLog);