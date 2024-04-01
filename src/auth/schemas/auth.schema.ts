import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AuthDocument = Auth & Document;

//Defining Auth schema
@Schema({
    timestamps:true
})

export class Auth {

    //Username property 
    @Prop({ required: true })
    username: string;

    //Password property 
    @Prop({ required: true })
    password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);