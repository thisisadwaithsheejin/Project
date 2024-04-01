import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import mongoose from 'mongoose';
import { Review } from '../schemas/reviews.schema';

@Injectable()
export class UserProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>,
    ){}
    
    /**
     * Find all products
     * @returns All products available
     */
    async findAll(): Promise<Product[]>{
        const products = await this.productModel.find()
        return products;   
    }

    /**
     * Find a product by ID
     * @param id The ID of the product to retrieve
     * @returns The product with the specified ID
     */
    async findById(id:string):Promise<Product>{
        const cid = await this.productModel.findById(id)
        if(!cid){
            throw new NotFoundException('Product not found')
        }   
        return cid;
    }

    /**
     * Search for products based on various parameters
     * @param category The category of products to search for
     * @param minPrice The minimum price of products to search for
     * @param maxPrice The maximum price of products to search for
     * @param name The name of products to search for
     * @param minRating The minimum rating of products to search for
     * @returns Matching products
     */
    async searchProducts(category:string,minPrice:number,maxPrice:number,name: string,minRating:number):Promise<Product[]>{
        const query : any ={};
        if (name) {
            query.p_name = { $regex: new RegExp(name, 'i') };
        }
        if(category){
            query.p_category = category;
        }
        if(minPrice !==undefined && maxPrice !== undefined){
            query.p_price = {$gte:minPrice,$lte:maxPrice};
        }
        
        if(minRating!==undefined){
            query.averageRating = {$gte:minRating};
        }
        
        const products = await this.productModel.find(query);
        return products;
    }
    
    /**
     * Add a review to a product
     * @param productId productId The ID of the product to add a review to
     * @param review review The review data
     * @returns The updated product with the added review
     */
    async addReview(productId:string , review:Review):Promise<Product>{
        const product = await this.productModel.findById(productId).exec();
        if(!product){
            throw new NotFoundException('Product not found')
        }
        product.reviews.push(review);
        //Calculate average rating and update it in the product
        await product.save();
        return product;
    }

    /**
     * Calculate the average rating based on the given reviews 
     * @param reviews the array of reviews
     * @returns the average rating 
     */
    calculateAverageRating(reviews:Review[]):number{
        if(!reviews||reviews.length===0){
            return 0;
        }
        const total = reviews.reduce((acc,curr)=>acc+curr.rating,0);
        return total/reviews.length;
    }
}