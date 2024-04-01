import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from '../dto/create-cart.dto';
import { UpdateCartItemDto } from '../dto/update-cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService){}

    /**
     * Adds a new item to the cart 
     * @param CreateCartItemDto 
     * @returns 
     */
    @Post()
    async addToCart(@Body() CreateCartItemDto:CreateCartItemDto){
        return this.cartService.addToCart(CreateCartItemDto);
    }

    /**
     * Removes an item from the cart 
     * @param cartItemId 
     * @returns 
     */
    @Delete(':id')
    async removeFromCart(@Param('id')cartItemId:string){
        return this.cartService.removeFromCart(cartItemId);
    }

    /**
     * updates item 
     * @param cartItemId 
     * @param updateCartItemDto 
     * @returns 
     */
    @Patch(':id')
    async updateCartItem(@Param('id') cartItemId:string ,@Body() updateCartItemDto:UpdateCartItemDto){
        //Assign the cart item ID
        updateCartItemDto.cartItemId=cartItemId;
        return this.cartService.updateCartItem(updateCartItemDto);
    }
}
