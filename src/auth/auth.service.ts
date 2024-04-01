import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param signupDto 
   * @returns Promise<{message:string}>
   */
  async signup(signupDto: SignupDto) {
    const { username, password } = signupDto;
    //Hash the password before saving 
    const hashedPassword = await bcrypt.hash(password,10);
    
    //create a new user with hashed password
    const newUser = new this.authModel({ username, password:hashedPassword});
    
    //Save the user to the data base
    await newUser.save();
    
    //return success message
    return { message: 'User registered successfully' };
  }

  /**
   * Logs in an existing user
   * @param loginDto 
   * @returns Promise<{token:string}>
   */
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    //find the user by username
    const user = await this.authModel.findOne({ username });

    // If user not found or password doesn't match, throw UnauthorizedException
    if (!user || !(await bcrypt.compare(password,user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token for the user
    const token = this.generateToken(user);
    return { token };
  }

  /**
   * Generates JWT token for the user
   * @param user AuthDocument
   * @returns string
   */
  private generateToken(user: AuthDocument) {
    const payload = { username: user.username, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
