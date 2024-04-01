import { Module } from '@nestjs/common';
import { Order, OrderSchema } from '../schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminOrderController } from './admin.order.controller';
import { AdminOrderService } from './admin.order.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [AdminOrderController],
  providers:  [AdminOrderService]
})
export class AdminOrderModule {}
