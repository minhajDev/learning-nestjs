/* eslint-disable prettier/prettier */
// Import necessary dependencies and the Product model
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

// Declare an Injectable service to handle product CRUD operations
@Injectable()
export class ProductsService {
  // Create an array of Products, which is not currently used in this implementation
  private products: Product[] = [];

  // Inject the Product model into this service
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  // Create a new product and save it to the database
  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      desc,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  // Retrieve all products from the database
  async getProducts() {
    const products = await this.productModel.find().exec();
    return products as Product[];
  }

  // Retrieve a single product from the database based on ID
  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      desc: product.desc,
      price: product.price,
    };
  }

  // Update an existing product in the database
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.title = title;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  // Delete an existing product from the database
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  // Helper function to find a product in the database by ID
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
