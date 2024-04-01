import { Module } from '@nestjs/common';
import { UserProductsController } from './user.products.controller';
import { UserProductsService } from './user.products.service';
import { ProductSchema } from '../schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'Product',schema:ProductSchema}])],
  controllers: [UserProductsController],
  providers: [UserProductsService]
})
export class UserProductsModule {}
