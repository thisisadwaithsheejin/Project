import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaType } from "mongoose";

@Schema()
export class Review extends Document{

    //userId of user who reviewed 
    @Prop()
    userId:string;

    //rating of the product 
    @Prop()
    rating:number;

    //comment given by the user
    @Prop()
    comment:string;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);