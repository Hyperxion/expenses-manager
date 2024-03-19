import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<string> {
    const username = await this.authService.registerUser(registerUserDto);

    return `User ${username} created.`;
  }

  @Post('/login')
  async loginUser(
    @Body() authCredentialsDto: RegisterUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginUser(authCredentialsDto);
  }
}
