import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
    ){}
    
    /**
     * Retrieves all users
     * @returns {Promise<User[]>} lisat of all users
     */
    async findAll(): Promise<User[]>{
        //Find all users from the database
        const users = await this.userModel.find()
        return users;   
    }
    /**
     * Create a new user
     * @param user the user data to be created
     * @returns the created usesr
     */
    async create(user:User): Promise<User>{
        //create a new user in the database
        const res = await this.userModel.create(user)
        return res;
    }
    /**
     * Find user by ID
     * @param id the id of the user to find
     * @returns {Promise<User>} the user with the specified ID
     */
    async findById(id:string):Promise<User>{
        //Find a user by its ID from the database
        const cid = await this.userModel.findById(id)
        if(!cid){
            //If user is not found , throw a NotFoundException
            throw new NotFoundException('User not found')
        }   
        return cid;
    }
    /**
     * Update a user by ID
     * @param id string the Id of the user to update
     * @param cid User The updated user data
     * @returns {Promise<User>} the updated user
     */
    async updateById(id:string,cid:User):Promise<User>{
        // Update the user with the provided ID using the updated user data
        return await this.userModel.findByIdAndUpdate(id,cid,{
            new :true , //Return the updated document
            runValidators: true //Run validators during update
        });
    }    
    /**
     * Delete a user by ID
     * @param id string The ID of the user to delete
     * @returns {Promise<User>} The deleted user
     */
    async deleteById(id:string):Promise<User>{
        // Find and delete the user by its ID from the database
        return await this.userModel.findByIdAndDelete(id);
    }
}

