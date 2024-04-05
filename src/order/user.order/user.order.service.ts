import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class UserOrderService {
    constructor(@InjectModel(Order.name)private orderModel:Model<Order>){}

    /**
     * Retrieves all orders
     * @returns Promise<Order[]> An array of orders
     */
    async findAll():Promise<Order[]>{
        const orders = await this.orderModel.find()
        return orders;
    }

    /**
     * Retrieves an order by its ID
     * @param id string The ID of the order to retrieve
     * @returns Promise<Order> the requested order
     */
    async findById(id:string):Promise<Order>{
        //Find order by ID
        const cid = await this.orderModel.findById(id)   
        return cid;
    }

    /**
     * creates a new order
     * @param createOrderDto CreateOrderDto Data for creating a new order 
     * @returns Promise<Order> The newly created order
     */
    async createOrder(createOrderDto:CreateOrderDto):Promise<Order>{
        const createdOrder = new this.orderModel(createOrderDto);
        return createdOrder.save();
    }
}
