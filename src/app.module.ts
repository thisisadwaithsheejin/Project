import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AdminProductsModule } from './products/admin.products/admin.products.module';
import { UserProductsModule } from './products/user.products/user.products.module';
import { UserOrderModule } from './order/user.order/user.order.module';
import { AdminOrderModule } from './order/admin.order/admin.order.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    OrderModule,
    UserModule, 
    AdminProductsModule,
    UserProductsModule,
    UserOrderModule, 
    AdminOrderModule,
    AuthModule, AdminModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*')
  }
}

