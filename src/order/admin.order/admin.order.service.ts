import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderStatus } from '../schemas/order.schema';

@Injectable()
export class AdminOrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
    
    /**
     * creates a new order 
     * @param customerName string Customer name
     * @param products Products string[] Array of product IDs
     * @param status OrderStatus Status of the order
     * @returns Promise<Order> newly created order 
     */
    async createOrder(customerName:string,products:string[],status: OrderStatus): Promise<Order> {
        //convert product IDs to ObjectIds
        const productIds = products.map(productId=>Types.ObjectId.createFromHexString(productId))
        //create new order instance
        const createdOrder = new this.orderModel({ customerName , product:productIds , status });
        //save the order to the database
        return createdOrder.save();
    }

    /**
     * retrives all orders 
     * @returns Promise<Order[]> Array of orders 
     */
    async getAllOrders(): Promise<Order[]> {
        //find all orders in the database 
        return this.orderModel.find().exec();
    }

    /**
     * Updates the status of an order 
     * @param orderId string Order ID
     * @param status OrderStatus New status of the order 
     * @returns Promise<Order|null> the updated order , or null if the order was not found 
     */
    async updateOrderStatus(orderId:string,status:OrderStatus):Promise<Order|null>{
        //Find and update the order by ID
        return this.orderModel.findByIdAndUpdate(orderId,{status},{new:true}).exec();
    }

    /**
     * Cancels an order by updating its staus to 'CANCELLED'
     * @param orderId 
     * @returns the cancelled order , or null if the order was not found .
     */
    async cancelOrder(orderId:string):Promise<Order|null>{
        //Call updateOrderStatus method to cancel the order 
        return this.updateOrderStatus(orderId,OrderStatus.CANCELLED);
    }
}
