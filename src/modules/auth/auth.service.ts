import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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
    if (
      !user ||
      !(await bcrypt.compare(loginAuthDto.password, user.password))
    ) {
      throw new UnauthorizedException('Thông tin không hợp lệ');
    }
    const payload = { sub: user._id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
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
