import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let isAuthEnabled = false;

    if (this.configService.get('ENABLE_AUTH') === 'true') isAuthEnabled = true;
    if (!isAuthEnabled) return true;

    const secret = this.configService.get('JWT_SECRET');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(
    request: Request & { authorization },
  ): string | undefined {
    const [type, token] =
      (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
