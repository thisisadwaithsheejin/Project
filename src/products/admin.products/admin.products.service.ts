import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import mongoose from 'mongoose';

@Injectable()
export class AdminProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>,
    ){}
    
    /**
     * Find all products
     * @returns Promise<Product[]>
     */
    async findAll(): Promise<Product[]>{
        const products = await this.productModel.find()
        return products;   
    }
    
    /**
     * Create a new product 
     * @param product 
     * @returns 
     */
    async create(product:Product): Promise<Product>{
        const res = await this.productModel.create(product)
        return res;
    }

    /**
     * Search for products
     * @param query 
     * @returns Promise<Product[]> 
     */
    async searchProducts(query: any): Promise<Product[]> {
        const {searchTerm} = query;
        if(!searchTerm){
            return await this.productModel.find();
        }
        const regex = new RegExp(searchTerm,'i')
        const products = await this.productModel.find({name:{$regex:regex}});
        return products;
    }
     
    /**
     * Find a particular product by ID
     * @param id 
     * @returns 
     */
    async findById(id:string):Promise<Product>{
        const cid = await this.productModel.findById(id)
        if(!cid){
            //throws NotFoundException if not found
            throw new NotFoundException('Product not found')
        }   
        return cid;
    }
 
    /**
     * Update a product by ID
     * @param id 
     * @param cid 
     * @returns the updated product
     */
    async updateById(id:string,cid:Product):Promise<Product>{
        return await this.productModel.findByIdAndUpdate(id,cid,{
            new :true ,
            runValidators: true
        });
    }
    
    
    /**
     * Delete a product by ID
     * @param id 
     * @returns the deleted product
     */
    async deleteById(id:string):Promise<Product>{
        return await this.productModel.findByIdAndDelete(id);
    }

    /**
     * log an action with associated data
     * @param action 
     * @param data 
     */
    async logAction(action: string, data: any): Promise<void> {
        console.log(`Action: ${action}, Data: ${JSON.stringify(data)}`);
    }
}
