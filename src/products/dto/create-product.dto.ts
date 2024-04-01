import { Category,Review } from "../schemas/product.schema";

export class CreateProductDto
{
    readonly p_name:string;
    readonly p_description:string;
    readonly p_image:string[];
    readonly p_price:number;
    readonly p_quantity:number;
    readonly p_category:Category;
    readonly reviews:Review[];
}