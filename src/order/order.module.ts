import { Module } from '@nestjs/common';
import { Order, OrderSchema } from './schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { AdminModule } from 'src/admin/admin.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [CartModule , AdminModule , UserModule, MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]) ],
  controllers: [],
  providers: [],
})
export class OrderModule {}
