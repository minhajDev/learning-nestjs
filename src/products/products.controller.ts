/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Handles incoming HTTP POST requests to add a new product
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    // return success message with the id of the newly created product
    return { id: generatedId, message: 'Product added successfully' };
  }

  // Handles incoming HTTP GET requests to retrieve all products
  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    // return array of products with count
    return {
      count: products.length,
      products: products.map((prod) => ({
        id: prod.id,
        title: prod.title,
        desc: prod.desc,
        price: prod.price,
      })),
    };
  }

  // Handles incoming HTTP GET requests to retrieve a single product by ID
  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    const product = await this.productsService.getSingleProduct(prodId);
    // return the requested product
    return {
      id: product.id,
      title: product.title,
      desc: product.desc,
      price: product.price,
    };
  }

  // Handles incoming HTTP PATCH requests to update an existing product
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    // return success message
    return { message: 'Product updated successfully' };
  }

  // Handles incoming HTTP DELETE requests to remove a product by ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProduct(@Param('id') prodId: string) {
    const result = await this.productsService.deleteProduct(prodId);
    if (result.deletedCount === 0) {
      // if the product was not found, throw an error
      throw new NotFoundException('Could not find product.');
    }
    // return success message
    return { message: 'Product deleted successfully' };
  }
}
