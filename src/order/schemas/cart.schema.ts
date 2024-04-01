import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Product } from "src/products/schemas/product.schema";
import { User } from "src/user/schemas/user.schema";

@Schema({
    timestamps: true,
})
export class Cart extends Document {

        //user ID associated with cart item 
        @Prop({type:SchemaTypes.ObjectId,ref:User.name})
        userId:Types.ObjectId;

        //Array of product IDs associated with this cart item
        @Prop([{ type: SchemaTypes.ObjectId, ref: Product.name }])
        productId: Types.ObjectId[];

        //total price of the item
        @Prop()
        total:number;
        
        //quantity of the product
        @Prop()
        quantity:number;

        //Price of the product in the cart
        @Prop()
        price:number;

}

export const cartSchema = SchemaFactory.createForClass(Cart);