import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from './dto/login-user-dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    return await this.usersRepository.createUser(registerUserDto);
  }

  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginUserDto;
    const user = await this.usersRepository.getByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { id: user.id };
      const accessToken: string = await this.jwtService.sign(payload);

      this.logger.log(
        `Successful login: ${username}`,
        `${AuthService.name}.${this.loginUser.name}()`,
      );

      return { accessToken };
    } else {
      this.logger.warn(
        `Failed login: ${username}`,
        `${AuthService.name}.${this.loginUser.name}()`,
      );

      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
