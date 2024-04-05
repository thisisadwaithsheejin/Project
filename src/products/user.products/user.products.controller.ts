import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserProductsService } from './user.products.service';
import { Product } from '../schemas/product.schema';
import { Review } from '../schemas/reviews.schema';

@Controller('v1/user/products')
export class UserProductsController {
    constructor(private productService: UserProductsService) {}

    /**
     * Retrieves all products
     * @returns Promise<Product[]> array of all products
     */
    @Get()
    async getAllProduct(): Promise<Product[]> {
        return this.productService.findAll();
    }

    /**
     * Search for products based on various parameters
     * @param category category of products to search for
     * @param minPrice minPrice of products to search for
     * @param maxPrice maxPrice of products to search for
     * @param name name of products to search for
     * @param minRating minRating of products to search for
     * @returns Promise<Product[]> An array of Matching products
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
     * retrieves a product by its ID
     * @param id string the ID of the product to retrieve
     * @returns Promise<Product> The requested product
     */
    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.findById(id);
    }

    /**
     * Add a review to a product
     * @param productId string the id of the product to add a review to 
     * @param review Review The review data to add
     * @returns Promise<Product> the updated product with the added review
     */
    @Post(':id/reviews')
    async addReview(
        @Param('id')productId:string,
        @Body() review:Review,
    ):Promise<Product>{
        return this.productService.addReview(productId,review)
    }
}
