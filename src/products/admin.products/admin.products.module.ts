import { Module } from '@nestjs/common';
import { AdminProductsService } from './admin.products.service';
import { AdminProductsController } from './admin.products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../schemas/product.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Product',schema:ProductSchema}])],
  providers: [AdminProductsService],
  controllers: [AdminProductsController]
})
export class AdminProductsModule {}
