import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ConfigKey from '@src/configs/config-key';
import { Role } from '@src/commons/constants';
import { User } from '../user/entities/user.entity';
import { LeanDocument, ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async generateAccessToken(user: LeanDocument<User & { _id: ObjectId }>) {
    const accessTokenExpiredIn = this.configService.get(
      ConfigKey.JWT_ACCESS_TOKEN_EXPIRED_IN,
    );

    const secretKey = this.configService
      .get(ConfigKey.JWT_ACCESS_TOKEN_SECRET_KEY)
      .replace(/\\n/g, '\n');

    const payloadToken = {
      id: user._id,
      email: user.email,
      name: user.username,
      role: user.role || Role.USER,
      expiresIn: accessTokenExpiredIn,
    };

    const accessToken = await this.jwtService.sign(payloadToken, {
      secret: secretKey,
      expiresIn: accessTokenExpiredIn,
    });
    return {
      token: accessToken,
      expiresIn: accessTokenExpiredIn,
    };
  }

  async create(createAuthDto) {
    return this.userService.create({
      ...createAuthDto,
    });
  }

  async login(loginAuthDto) {
    try {
      const user = await this.userService.findByEmail(loginAuthDto.email);
      const userToken = await this.generateAccessToken(user);
      delete user.password;
      return { ...userToken, ...user };
    } catch (error) {
      throw error;
    }
  }
}
