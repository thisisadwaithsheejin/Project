import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from '../dto/create-cart.dto';
import { UpdateCartItemDto } from '../dto/update-cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService){}

    /**
     * Adds a new item to the cart 
     * @param CreateCartItemDto CreateCartItemDto Data for creating a new cart item
     * @returns Promise<any>
     */
    @Post()
    async addToCart(@Body() CreateCartItemDto:CreateCartItemDto){
        return this.cartService.addToCart(CreateCartItemDto);
    }

    /**
     * Removes an item from the cart 
     * @param cartItemId string ID of the cart item to remove
     * @returns Promise<any>
     */
    @Delete(':id')
    async removeFromCart(@Param('id')cartItemId:string){
        return this.cartService.removeFromCart(cartItemId);
    }

    /**
     * updates a cart item 
     * @param cartItemId string ID of the cart item to update
     * @param updateCartItemDto UpdateCartItemDto Data for updating the cart item
     * @returns Promise<any>
     */
    @Patch(':id')
    async updateCartItem(@Param('id') cartItemId:string ,@Body() updateCartItemDto:UpdateCartItemDto){
        //Assign the cart item ID
        updateCartItemDto.cartItemId=cartItemId;
        return this.cartService.updateCartItem(updateCartItemDto);
    }
}
