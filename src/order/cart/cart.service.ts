import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from '../schemas/cart.schema';
import { Model } from 'mongoose';
import { CreateCartItemDto } from '../dto/create-cart.dto';
import { UpdateCartItemDto } from '../dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name)private readonly cartModel:Model<Cart>){}

    /**
     * Add an item to cart 
     * @param CreateCartItemDto 
     * @returns 
     */
    async addToCart(CreateCartItemDto:CreateCartItemDto):Promise<Cart>{
        const {userId , productId , quantity , price }= CreateCartItemDto;
        const total = quantity * price;
        const createdCartItem = new this.cartModel({ userId, productId, quantity, price, total });
        return createdCartItem.save();
    }

    /**
     * Remove an item from the cart
     * @param cartItemId 
     * @returns 
     */
    async removeFromCart(cartItemId:string):Promise<Cart>{
        return this.cartModel.findByIdAndDelete(cartItemId).exec();
    }

    /**
     * update quantity
     * @param updateCartItemDto 
     * @returns 
     */
    async updateCartItem(updateCartItemDto:UpdateCartItemDto):Promise<Cart>{
        const {cartItemId,quantity}=updateCartItemDto;
        return this.cartModel.findByIdAndUpdate(cartItemId,{quantity},{new:true}).exec();
    }   
}
