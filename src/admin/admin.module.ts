import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schemas/admin.schema';
import { AdminLogService } from './admin.log/admin.log.service';
import { AdminLog, AdminLogSchema } from './schemas/admin.log.schema';
import { AdminLoggingMiddleware } from 'src/middleware/admin.logging.middleware';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Admin',schema:AdminSchema},
    {name:AdminLog.name,schema:AdminLogSchema},  
  ]),
],
  providers: [AdminService, AdminLogService,],
  controllers: [AdminController]
})
export class AdminModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminLoggingMiddleware)
    .forRoutes('/admin')
  }
}