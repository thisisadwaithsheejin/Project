import { Get,Post,Put,Controller, Body, Param , Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService,
        ) {}
    /**
     * Retirves all admins . 
     * @returns Promise<Admin[]>
     */
    @Get()
    async getAllAdmin(): Promise<Admin[]> {
        //Fetch all admins 
        const admins = await this.adminService.findAll();
        return admins;
    }
    /**
     * creates a new admin
     * @param admin 
     * @returns Promise<Admin>
     */
    @Post()
    async createAdmin(@Body() admin: CreateAdminDto): Promise<Admin> {
        //Create a new admin
        const createdAdmin=await this.adminService.create(admin)
        return createdAdmin;
    }
    /**
     * Retrieves a specific admin by ID.
     * @param id 
     * @returns Promise<Admin>
     */
    @Get(':id')
    async getAdmin(@Param('id') id: string): Promise<Admin> {
        //Find admin by ID
        const admin = await this.adminService.findById(id);
        return admin;
    }
    /**
     * Updates an existing admin by ID
     * @param id string
     * @param admin UpdateAdminDto
     * @returns Promise<Admin>
     */
    @Put(':id')
    async updateAdmin(@Param('id') id: string, @Body() admin: UpdateAdminDto): Promise<Admin> {
        //Update admin by ID
        const updatedAdmin = await this.adminService.updateById(id, admin);
        return updatedAdmin;
    }
    /**
     * Deletes an admin by ID 
     * @param id string
     * @returns Promise<Admin>
     */
    @Delete(':id')
    async deleteAdmin(@Param('id') id: string): Promise<Admin> {
        //Delete admin by ID
        const deletedAdmin = await this.adminService.deleteById(id);
        return deletedAdmin;
    }    
}