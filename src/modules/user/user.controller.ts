import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/commons/decorators/role.decorator';
import { RoleGuard } from 'src/guards/authorization.guard';
import { AuthenticationGuard } from '@src/guards/authentication.guard';
import { SuccessResponse } from '@src/commons/helpers/response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles('admin')
  @UseGuards(AuthenticationGuard, RoleGuard)
  @Get()
  async profile() {
    try {
      const users = await this.userService.findAll();
      return new SuccessResponse(users);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
