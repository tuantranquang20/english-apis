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
import { LessonService } from './lesson.service';
import { JoiValidationPipe, TrimBodyPipe } from 'src/commons/pipe';
import { ICreateLesson } from './lesson.interface';
import { createCourseSchema } from './lesson.validator';
import { SuccessResponse } from '@src/commons/helpers/response';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async create(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(createCourseSchema))
    body: ICreateLesson,
  ) {
    try {
      const newLesson = await this.lessonService.create(body);
      return new SuccessResponse(newLesson);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get()
  findAll() {
    try {
      return this.lessonService.findAll();
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.lessonService.findOne(+id);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto) {
    try {
      return this.lessonService.update(+id, updateLessonDto);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.lessonService.remove(+id);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
