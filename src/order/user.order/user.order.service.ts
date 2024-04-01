import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class UserOrderService {
    constructor(@InjectModel(Order.name)private orderModel:Model<Order>){}

    /**
     * creates an order
     * @param createOrderDto 
     * @returns Promise<Order>
     */
    async createOrder(createOrderDto:CreateOrderDto):Promise<Order>{
        const createdOrder = new this.orderModel(createOrderDto);
        return createdOrder.save();
    }
}
