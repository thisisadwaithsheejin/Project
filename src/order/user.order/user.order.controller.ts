import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserOrderService } from './user.order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../schemas/order.schema';

@Controller('user/order')
export class UserOrderController {
    constructor(private readonly userOrderService:UserOrderService){}

    /**
     * For getting all orders
     * @returns Order[]
     */
    @Get()
    async getAllOrders(): Promise<Order[]> {
        //Fetch all orders 
        const orders = await this.userOrderService.findAll();
        return orders;
    }
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

    /**
     * Call a particular order
     * @param id 
     * @returns Order
     */
    @Get(':id')
    async getOrder(@Param('id') id: string): Promise<Order> {
        const order = await this.userOrderService.findById(id);
        return order;
    }
}
