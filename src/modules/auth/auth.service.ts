import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const existingUser = await this.userService.findByEmail(
      createAuthDto.email,
    );
    if (existingUser) {
      throw new UnauthorizedException('Email is already registered.');
    }

    return this.userService.create({
      ...createAuthDto,
    });
  }

  async login(loginAuthDto) {
    const user = await this.userService.findByEmail(loginAuthDto.email);
    // if (
    //   !user ||
    //   !(await bcrypt.compare(loginAuthDto.password, user.password))
    // ) {
    //   throw new UnauthorizedException('Thông tin không hợp lệ');
    // }
    const userToken = await this.generateAccessToken(user);
    return userToken;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
