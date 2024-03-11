import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAuthEnabled = this.configService.get('ENABLE_AUTH');
    //TODO
    /**
     * Custom RolesGuard which performs authentication when ENABLE_AUTH = true and
     * skips authentication when ENABLE_AUTH = false
     */
    // const result = isAuthEnabled ? true : false;
    console.log(`ENABLE_AUTH ${isAuthEnabled}`);
    // console.log(`ENABLE_AUTH result ${result}`);
    return !isAuthEnabled;
  }
}
