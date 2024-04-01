import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Handles user signup
     * @param signupDto 
     * @returns Promise<any>
     */
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    /**
     * Handles user login
     * @param loginDto 
     * @returns Promise<any>
     */
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
