import { Controller, Post, Body, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { AdminProductsService } from './admin.products.service';
import { Product } from '../schemas/product.schema';

@Controller('admin/products')
export class AdminProductsController {
    constructor(private productService: AdminProductsService) {}

    /**
     * Get all products
     * @returns Promise<Product[]>
     */
    @Get()
    async getAllProduct(): Promise<Product[]> {
        return this.productService.findAll();
    }

    /**
     * Creates a new product
     * @param product 
     * @returns Promise<Product>
     */
    @Post()
    async createProduct(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    /**
     * search for a paticular product based on query 
     * @param query 
     * @returns Product[]
     */
    @Get('search')
    async searchProducts(@Query() query: any): Promise<Product[]> {
        return this.productService.searchProducts(query);
    }
    
    /**
     * Get details of a particular product
     * @param id 
     * @returns Promise<Product>
     */
    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.findById(id);
    }

    /**
     * Puts a particular change 
     * @param id 
     * @param product 
     * @returns Promise<Product>
     */
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Product): Promise<Product> {
        return this.productService.updateById(id, product);
    }

    /**
     * delete a particular product
     * @param id 
     * @returns Promise<Product>
     */
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.deleteById(id);
    }    
}
