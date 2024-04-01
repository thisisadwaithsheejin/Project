import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthSchema } from './schemas/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    JwtModule.register({
      secret: 'thisisadwaith',
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
