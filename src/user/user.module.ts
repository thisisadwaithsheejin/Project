import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogService } from './user.log/user.log.service';
import { UserLog, UserLogSchema } from './schemas/user.log.schema';
import { UserLoggingMiddleware } from 'src/middleware/user.logging.middleware';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'User',schema:UserSchema},
    {name:UserLog.name,schema:UserLogSchema},
  ]),],
  controllers: [UserController],
  providers: [UserService, UserLogService,]
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserLoggingMiddleware).forRoutes('/user');
  }
}
