import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { JoiValidationPipe, TrimBodyPipe } from '@src/commons/pipe';
import { ICreateAuth, ILoginAuth } from './auth.interface';
import { AuthService } from './auth.service';
import { createAuthValidator, loginAuthValidator } from './auth.validator';
import { ErrorResponse, SuccessResponse } from '@src/commons/helpers/response';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async create(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(createAuthValidator))
    createAuthDto: ICreateAuth,
  ) {
    try {
      const existingUser = await this.userService.findByEmail(
        createAuthDto.email,
      );
      if (existingUser) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST, 'Email đã tồn tại');
      }
      const newUser = await this.authService.create(createAuthDto);
      return new SuccessResponse(newUser);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post('/login')
  async login(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(loginAuthValidator))
    loginAuthDto: ILoginAuth,
  ) {
    try {
      const userByEmail = await this.userService.findByEmail(
        loginAuthDto.email,
      );
      const errors = [];
      if (!userByEmail) {
        errors.push({
          message: 'Email không tồn tại',
          statusCode: 400,
        });
      }
      const isCorrectPassword = await bcrypt.compare(
        loginAuthDto?.password,
        userByEmail?.password,
      );

      if (!isCorrectPassword) {
        errors.push({
          message: 'Password không hợp lệ',
          statusCode: 400,
        });
      }

      if (errors?.length) {
        return new ErrorResponse(
          HttpStatus.BAD_REQUEST,
          'Thông tin không hợp lệ',
          errors,
        );
      }
      const user = await this.authService.login(loginAuthDto);
      return new SuccessResponse(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
