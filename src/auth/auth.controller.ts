import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: String })
  @Post('/register')
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<string> {
    const username = await this.authService.registerUser(registerUserDto);

    return `User ${username} created.`;
  }

  @ApiOkResponse({ type: String })
  @Post('/login')
  async loginUser(
    @Body() authCredentialsDto: RegisterUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginUser(authCredentialsDto);
  }
}
