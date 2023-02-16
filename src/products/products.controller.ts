/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, Get, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

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
        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            desc: prod.desc,
            price: prod.price
        }));
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null
    }
}
