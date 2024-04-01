import { Module } from '@nestjs/common';
import { UserOrderService } from './user.order.service';
import { UserOrderController } from './user.order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schemas/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  providers: [UserOrderService],
  controllers: [UserOrderController]
})
export class UserOrderModule {}
