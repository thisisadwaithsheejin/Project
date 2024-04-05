import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Product } from "src/products/schemas/product.schema";

//enum defining differnet order status
export enum OrderStatus {
    SHIPPING = "shipping",
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

//Define schema for Order document
@Schema({
    timestamps: true,
})
export class Order extends Document {

    //name of customer placing order
    @Prop()
    customerName:string;

    //array of product IDs 
    @Prop([{ type: SchemaTypes.ObjectId, ref: Product.name }])
    product: Types.ObjectId[];

    //status of the order , default to 'processing
    @Prop({type:String,enum:OrderStatus,default:OrderStatus.PROCESSING})
    status:OrderStatus;
}
//Create Mongoose schema from Order class
export const OrderSchema = SchemaFactory.createForClass(Order);
