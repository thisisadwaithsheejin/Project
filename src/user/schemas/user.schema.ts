import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})
export class User{

    //user's name
    @Prop()
    u_name:string;

    //user's phone number
    @Prop()
    u_phoneno:number;

    //user's email
    @Prop()
    u_email:string;

    //user's password
    @Prop()
    u_password:string;
}

export const UserSchema = SchemaFactory.createForClass(User)