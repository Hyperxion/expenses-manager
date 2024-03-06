import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    const users = await this.authService.registerUser(registerUserDto);
  }
}
