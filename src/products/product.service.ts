/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(
        @InjectModel('Product')
        private readonly productModel: Model<Product>,
    ) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            desc,
            price,
        });
        const result = await newProduct.save();
        return result.id as string
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products as Product[];
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId)
        return {
            id: product.id,
            title: product.title,
            desc: product.desc,
            price: product.price,
        };
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
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


    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec()
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find product.');
        }
    }

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
