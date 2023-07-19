import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import {
  JoiValidationPipe,
  ModifyFilterQueryPipe,
  RemoveEmptyQueryPipe,
  TrimBodyPipe,
} from 'src/commons/pipe';
import {
  ICreateLesson,
  ILessonFilter,
  IUpdateLesson,
} from './lesson.interface';
import {
  createCourseValidator,
  lessonFilterValidator,
  updateCourseValidator,
} from './lesson.validator';
import { SuccessResponse } from '@src/commons/helpers/response';
import { IdObjectSchema } from '@src/commons/utils/validator';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async create(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(createCourseValidator))
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
  async findAll(
    @Query(
      new RemoveEmptyQueryPipe(),
      new JoiValidationPipe(lessonFilterValidator),
      new ModifyFilterQueryPipe(),
    )
    query: ILessonFilter,
  ) {
    try {
      const lessons = await this.lessonService.findAll(query);
      return new SuccessResponse(lessons);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new JoiValidationPipe(IdObjectSchema)) id: string,
    @Body(new TrimBodyPipe(), new JoiValidationPipe(updateCourseValidator))
    body: IUpdateLesson,
  ) {
    try {
      const updatedLesson = await this.lessonService.update(id, body);
      return new SuccessResponse(updatedLesson);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param('id', new JoiValidationPipe(IdObjectSchema)) id: string) {
    try {
      const removedLesson = await this.lessonService.remove(id);
      return new SuccessResponse(removedLesson);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
