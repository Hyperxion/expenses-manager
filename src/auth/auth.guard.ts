import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let isAuthEnabled = false;

    if (this.configService.get('ENABLE_AUTH') === 'true') isAuthEnabled = true;
    if (!isAuthEnabled) return true;

    const secret = this.configService.get('JWT_SECRET');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const handler = context.getHandler();
    const handlerClass = context.getClass();

    if (!token) {
      this.logger.error(
        `Unauthorized attempt to access ${handlerClass.name}.${handler.name}()`,
        'missing token',
        AuthGuard.name,
      );
      throw new UnauthorizedException();
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });

      request.userId = decoded.id;
      this.logger.log(
        `Calling ${handlerClass.name}.${handler.name}()`,
        AuthGuard.name,
        decoded.id,
      );
    } catch {
      this.logger.error(
        `Unauthorized attempt to access ${handlerClass.name}.${handler.name}()`,
        'error',
        AuthGuard.name,
      );
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
