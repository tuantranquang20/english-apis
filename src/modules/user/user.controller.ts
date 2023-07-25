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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/commons/decorators/role.decorator';
import { RoleGuard } from 'src/guards/authorization.guard';
import { AuthenticationGuard } from '@src/guards/authentication.guard';
import { SuccessResponse } from '@src/commons/helpers/response';
import {
  JoiValidationPipe,
  ModifyFilterQueryPipe,
  RemoveEmptyQueryPipe,
  TrimBodyPipe,
} from '@src/commons/pipe';
import { IFilterBase } from '@src/commons/interfaces/common.interface';
import { updateUserValidator, userFilterValidator } from './user.validator';
import { IUpdateUser } from './user.interface';
import { IdObjectSchema } from '@src/commons/utils/validator';

@UseGuards(AuthenticationGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return new SuccessResponse(newUser);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  async findAll(
    @Query(
      new RemoveEmptyQueryPipe(),
      new JoiValidationPipe(userFilterValidator),
      new ModifyFilterQueryPipe(),
    )
    query: IFilterBase,
  ) {
    try {
      const [data, total] = await this.userService.findAll(query);
      return new SuccessResponse({
        items: data,
        totalItems: total,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return new SuccessResponse(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new JoiValidationPipe(IdObjectSchema)) id: string,
    @Body(new TrimBodyPipe(), new JoiValidationPipe(updateUserValidator))
    body: IUpdateUser,
  ) {
    try {
      const updatedUser = await this.userService.update(id, body);
      return new SuccessResponse(updatedUser);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param('id', new JoiValidationPipe(IdObjectSchema)) id: string) {
    try {
      const removedLesson = await this.userService.remove(id);
      return new SuccessResponse(removedLesson);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
