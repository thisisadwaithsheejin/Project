import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class UserOrderService {
    constructor(@InjectModel(Order.name)private orderModel:Model<Order>){}

    /**
     * Findall orders
     * @returns Order[]
     */
    async findAll():Promise<Order[]>{
        const orders = await this.orderModel.find()
        return orders;
    }

    /**
     * Find order by Id
     * @param id 
     * @returns Order
     */
    async findById(id:string):Promise<Order>{
        //Find order by ID
        const cid = await this.orderModel.findById(id)   
        return cid;
    }

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
