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
     * @param CreateCartItemDto CreateCartItemDto Data for creating a new cart item
     * @returns The newly created cart item
     */
    async addToCart(CreateCartItemDto:CreateCartItemDto):Promise<Cart>{
        const {userId , productId , quantity , price }= CreateCartItemDto;
        const total = quantity * price;
        const createdCartItem = new this.cartModel({ userId, productId, quantity, price, total });
        return createdCartItem.save();
    }

    /**
     * Remove an item from the cart
     * @param cartItemId string ID of the cart item to remove
     * @returns Promise<Cart> the removed cart item
     */
    async removeFromCart(cartItemId:string):Promise<Cart>{
        return this.cartModel.findByIdAndDelete(cartItemId).exec();
    }

    /**
     * update the quantity of a cart item
     * @param updateCartItemDto UpdateCartItemDto Data for updating the cart item
     * @returns Promise<Cart> The updated cart item
     */
    async updateCartItem(updateCartItemDto:UpdateCartItemDto):Promise<Cart>{
        const {cartItemId,quantity}=updateCartItemDto;
        return this.cartModel.findByIdAndUpdate(cartItemId,{quantity},{new:true}).exec();
    }   
}
