/* eslint-disable prettier/prettier */
// Import necessary modules and dependencies
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Import the products service and controller, and the product schema
import { ProductsService } from './product.service';
import { ProductsController } from './products.controller';
import { ProductSchema } from './product.model';

@Module({
  // Import the product schema using MongooseModule
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  // Declare the products controller and service as the module's controllers and providers

  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
