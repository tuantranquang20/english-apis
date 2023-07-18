import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { extractToken } from 'src/commons/helpers/commonFunctions';
import ConfigKey from 'src/configs/config-key';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractToken(request.headers.authorization || '');
    if (!token) {
      throw new UnauthorizedException();
    }
    request.loginUser = await this.validateToken(token);
    return true;
  }

  async validateToken(token: string) {
    try {
      return await this.jwtService.verify(token, {
        secret: this.configService.get(ConfigKey.JWT_ACCESS_TOKEN_SECRET_KEY),
        ignoreExpiration: false,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
