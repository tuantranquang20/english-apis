import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor() {} // private readonly userService: UserService, // private readonly jwtService: JwtService,
  async create(createAuthDto) {
    // const existingUser = await this.userService.findByEmail(
    //   createAuthDto.email,
    // );
    // if (existingUser) {
    //   throw new UnauthorizedException('Email is already registered.');
    // }
    // const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    // return this.userService.create({
    //   ...createAuthDto,
    //   password: hashedPassword,
    // });
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
