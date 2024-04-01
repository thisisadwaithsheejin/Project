import { Body, Controller, Post } from '@nestjs/common';
import { UserOrderService } from './user.order.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('user/order')
export class UserOrderController {
    constructor(private readonly userOrderService:UserOrderService){}

    /**
     * Endpoint for creating a new order 
     * @param createOrderDto 
     * @returns 
     */
    @Post()
    async createOrder(@Body()createOrderDto:CreateOrderDto){
        // Call to the service to create the order
        return this.userOrderService.createOrder(createOrderDto)
    }
}
