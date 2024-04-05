import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Review, ReviewSchema } from "./reviews.schema";

export enum Category{
    SHOES = 'Shoes',
    MOBILES = 'Mobiles',
    WATCHES = 'Watches',
    DRESSES = 'Dresses'
}

@Schema({
    timestamps:true,
})

export class Product{

    //product name 
    @Prop()
    p_name:string;

    //Product description
    @Prop()
    p_description:string;

    //image of the product
    @Prop()
    p_image:string[];

    //no of product(quantity)
    @Prop()
    p_quantity:Number;

    //price of the product
    @Prop()
    p_price:number;

    //category of the product
    @Prop()
    p_category:Category

    //review of the product
    @Prop({type:[ReviewSchema],default:[]})
    reviews:Review[];

    //average rating of the product
    @Prop()
    averageRating : number;

}

export const ProductSchema = SchemaFactory.createForClass(Product)
export { Review }; 
