/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
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
    // Calls the ProductService to insert the new product and returns the ID
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  // Handles incoming HTTP GET requests to retrieve all products
  @Get()
  async getAllProducts() {
    // Calls the ProductService to get all products and returns them in a simplified format
    const products = await this.productsService.getProducts();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      desc: prod.desc,
      price: prod.price,
    }));
  }

  // Handles incoming HTTP GET requests to retrieve a single product by ID
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    // Calls the ProductService to get the single product by ID and returns it
    return this.productsService.getSingleProduct(prodId);
  }

  // Handles incoming HTTP PATCH requests to update an existing product
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    // Calls the ProductService to update the existing product with the new data
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  // Handles incoming HTTP DELETE requests to remove a product by ID
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    // Calls the ProductService to delete the product with the given ID
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
