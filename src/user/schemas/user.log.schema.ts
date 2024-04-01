import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class UserLog extends Document{
    @Prop()
    // ID of the user log entry
    id:string;

    @Prop()
    //path of the request
    path:string;

    @Prop()
    // HTTP request method (GET, POST, PUT, DELETE)
    method:string;

    @Prop({type:Date, default:Date.now})
    // Date and time when the log entry was created
    date:Date;
}
export const UserLogSchema = SchemaFactory.createForClass(UserLog);