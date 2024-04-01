import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Product } from "src/products/schemas/product.schema";

export enum OrderStatus {
    SHIPPING = "shipping",
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

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

export const OrderSchema = SchemaFactory.createForClass(Order);
