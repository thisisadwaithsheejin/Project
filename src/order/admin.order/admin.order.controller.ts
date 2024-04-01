import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AdminOrderService } from './admin.order.service';
import { Order, OrderStatus } from '../schemas/order.schema';

@Controller('admin/orders')
export class AdminOrderController {
    constructor(private readonly orderService: AdminOrderService) {}
    /**
     * Endpoint to create a new order . 
     * @param createOrderDto The data for creating a new order 
     * @returns the newly created order .
     */
    @Post()
    async createOrder(@Body() createOrderDto: {customerName:string , products:string[] , status:string }): Promise<Order> {
        const {customerName,products,status}=createOrderDto;
        const orderStatus:OrderStatus=OrderStatus[status.toUpperCase() as keyof typeof OrderStatus]
        return this.orderService.createOrder(customerName,products,orderStatus);
    }
   /**
    * Endpoint to retrieve all orders
    * @returns An array of orders 
    */
    @Get()
    async getAllOrders(): Promise<Order[]> {
        return this.orderService.getAllOrders();
    }

    /**
     * Endpoint to update the status of an order 
     * @param id the Id of the order to update 
     * @param status the new status of the order 
     * @returns the updated order , or null if the order was not found 
     */
    @Put(':id/status')
    async updateOrderStatus(@Param('id')id:string,@Body('status')status:OrderStatus):Promise<Order|null>{
        return this.orderService.updateOrderStatus(id,status);
    }

    /**
     * Endpoint to cancel an order . 
     * @param id the id of the order to cancel 
     * @returns the cancelled order , or null if the order was not found .
     */
    @Delete(':id')
    async cancelOrder(@Param('id')id:string):Promise<Order|null>{
        return this.orderService.cancelOrder(id)
    }
}