import { Get,Post,Put,Controller, Body, Param , Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminLogService } from './admin.log/admin.log.service';

@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService,
        private adminLogService : AdminLogService
        ) {}
    /**
     * Retirves all admins . 
     * @returns Promise<Admin[]>
     */
    @Get()
    async getAllAdmin(): Promise<Admin[]> {
        //Fetch all admins 
        const admins = await this.adminService.findAll();
        await this.adminLogService.admincreateLog({
            method:'GET',
            path:'/admin',
            date: new Date(),
            description:'Get all is called',
        })
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
        const createdAdmin=await this.adminService.create(admin);
        await this.adminLogService.admincreateLog({
            method:'POST',
            path:'/admin',
            date: new Date(),
            description:'POST admin is called'
        })
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
        await this.adminLogService.admincreateLog({
            method:'GET',
            path : '/admin/'+id,
            date: new Date(),
            description : `GET request for updating admin by ${id}`
        })
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
        await this.adminLogService.admincreateLog({
            method:'PUT',
            path : '/admin/'+id,
            date: new Date(),
            description : `PUT request for ${id}`
        })
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
        await this.adminLogService.admincreateLog({
            method:'DELETE',
            path : '/admin/'+id,
            date: new Date(),
            description : `DELETE by ID ${id}`
        })
        return deletedAdmin;
    }    
}