import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserOrderService } from './user.order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../schemas/order.schema';

@Controller('user/order')
export class UserOrderController {
    constructor(private readonly userOrderService:UserOrderService){}

    /**
     * Endpoint for retrieving all orders
     * @returns Promise<Order[]> An array of orders
     */
    @Get()
    async getAllOrders(): Promise<Order[]> {
        //Fetch all orders 
        const orders = await this.userOrderService.findAll();
        return orders;
    }
    /**
     * Endpoint for creating a new order 
     * @param createOrderDto CreateOrderDto Data for creating a new order
     * @returns Promise<any>
     */
    @Post()
    async createOrder(@Body()createOrderDto:CreateOrderDto){
        // Call the service to create the order
        return this.userOrderService.createOrder(createOrderDto)
    }

    /**
     * Endpoint for retrieving a particular order
     * @param id string ID of the order to retrieve
     * @returns Promise<Order> The requested order
     */
    @Get(':id')
    async getOrder(@Param('id') id: string): Promise<Order> {
        const order = await this.userOrderService.findById(id);
        return order;
    }
}
