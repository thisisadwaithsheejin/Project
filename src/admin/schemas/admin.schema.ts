import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})
export class Admin{

    //admin's name 
    @Prop()
    a_name:string;

    //admin's phoneno
    @Prop()
    a_phoneno:number;

    //admin's email
    @Prop()
    a_email:string;

    //admin's password
    @Prop()
    a_password:string;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
