import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { JoiValidationPipe, TrimBodyPipe } from '@src/commons/pipe';
import { ICreateAuth, ILoginAuth } from './auth.interface';
import { AuthService } from './auth.service';
import { createAuthValidator, loginAuthValidator } from './auth.validator';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from '@src/commons/helpers/response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/register')
  create(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(createAuthValidator))
    createAuthDto: ICreateAuth,
  ) {
    try {
      return this.authService.create(createAuthDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Post('/login')
  async login(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(loginAuthValidator))
    loginAuthDto: ILoginAuth,
  ) {
    try {
      const user = await this.authService.login(loginAuthDto);
      return new SuccessResponse(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
