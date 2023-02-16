/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsService } from './product.service';
import { ProductsController } from './products.controller';
import { ProductSchema } from './product.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
