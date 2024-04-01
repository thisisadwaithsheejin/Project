import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserProductsService } from './user.products.service';
import { Product } from '../schemas/product.schema';
import { Review } from '../schemas/reviews.schema';

@Controller('v1/user/products')
export class UserProductsController {
    constructor(private productService: UserProductsService) {}

    /**
     * Get all products
     * @returns all products
     */
    @Get()
    async getAllProduct(): Promise<Product[]> {
        return this.productService.findAll();
    }

    /**
     * Search for products based on various parameters
     * @param category The category of products to search for
     * @param minPrice The minPrice of products to search for
     * @param maxPrice The maxPrice of products to search for
     * @param name The name of products to search for
     * @param minRating The minRating of products to search for
     * @returns Matching products
     */
    @Get('search')
    async searchProducts(
        @Query('category')category:string,
        @Query('minPrice')minPrice:number,
        @Query('maxPrice')maxPrice:number,
        @Query('name') name: string,
        @Query('minRating')minRating:number,
        
    ):Promise<Product[]>{
        return this.productService.searchProducts(category,minPrice,maxPrice,name,minRating);
    }
    
    /**
     * Get a product by ID
     * @param id the id of the product to retrieve
     * @returns the product with specified ID
     */
    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.findById(id);
    }

    /**
     * Add a review to a product
     * @param productId the id of the product to add a review to 
     * @param review 
     * @returns the updated product with the added review
     */
    @Post(':id/reviews')
    async addReview(
        @Param('id')productId:string,
        @Body() review:Review,
    ):Promise<Product>{
        return this.productService.addReview(productId,review)
    }
}
