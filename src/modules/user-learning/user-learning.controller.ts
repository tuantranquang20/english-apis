import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserLearningService } from './user-learning.service';
import { CreateUserLearningDto } from './dto/create-user-learning.dto';
import { UpdateUserLearningDto } from './dto/update-user-learning.dto';

@Controller('user-learning')
export class UserLearningController {
  constructor(private readonly userLearningService: UserLearningService) {}

  @Post()
  create(@Body() createUserLearningDto: CreateUserLearningDto) {
    return this.userLearningService.create(createUserLearningDto);
  }

  @Get()
  findAll() {
    return this.userLearningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLearningService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserLearningDto: UpdateUserLearningDto,
  ) {
    return this.userLearningService.update(+id, updateUserLearningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLearningService.remove(+id);
  }
}
