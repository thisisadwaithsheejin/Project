import { Controller, Post, Body, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { AdminProductsService } from './admin.products.service';
import { Product } from '../schemas/product.schema';

@Controller('admin/products')
export class AdminProductsController {
    constructor(private productService: AdminProductsService) {}

    /**
     * Retrieves all products
     * @returns Promise<Product[]> An array of products
     */
    @Get()
    async getAllProduct(): Promise<Product[]> {
        return this.productService.findAll();
    }

    /**
     * Creates a new product
     * @param product Product the product data
     * @returns Promise<Product> The newly created product
     */
    @Post()
    async createProduct(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    /**
     * search for a paticular product based on query parameters
     * @param query any Query parameters for searching products
     * @returns Promies<Product[]> An array of products matching the query
     */
    @Get('search')
    async searchProducts(@Query() query: any): Promise<Product[]> {
        return this.productService.searchProducts(query);
    }
    
    /**
     * Retrives details of a particular product
     * @param id string The ID of the product to retrieve
     * @returns Promise<Product> The requested product
     */
    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.findById(id);
    }

    /**
     * Updates a particular change 
     * @param id string The ID of the product to update
     * @param product Product The updated product data
     * @returns Promise<Product> The updated product
     */
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Product): Promise<Product> {
        return this.productService.updateById(id, product);
    }

    /**
     * Delete a particular product
     * @param id string The ID of the product to delete
     * @returns Promise<Product>
     */
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.deleteById(id);
    }    
}
