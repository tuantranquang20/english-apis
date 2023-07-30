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
import { SuccessResponse } from '@src/commons/helpers/response';
import {
  JoiValidationPipe,
  ModifyFilterQueryPipe,
  RemoveEmptyQueryPipe,
  TrimBodyPipe,
} from '@src/commons/pipe';
import { IdObjectSchema } from '@src/commons/utils/validator';
import { ICreateReading, IUpdateReading } from './reading.interface';
import { ReadingService } from './reading.service';
import {
  createReadingValidator,
  readingFilterValidator,
  updateReadingValidator,
} from './reading.validator';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  async create(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(createReadingValidator))
    createReadingDto: ICreateReading,
  ) {
    try {
      const newReading = await this.readingService.create(createReadingDto);
      return new SuccessResponse(newReading);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAll(
    @Query(
      new RemoveEmptyQueryPipe(),
      new JoiValidationPipe(readingFilterValidator),
      new ModifyFilterQueryPipe(),
    )
    query: any,
  ) {
    try {
      const [data, total] = await this.readingService.findAll(query);
      return new SuccessResponse({
        items: data,
        totalItems: total,
      });
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', new JoiValidationPipe(IdObjectSchema)) id: string,
  ) {
    try {
      const reading = await this.readingService.findOne(id);
      return new SuccessResponse(reading);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new JoiValidationPipe(IdObjectSchema)) id: string,
    @Body(new TrimBodyPipe(), new JoiValidationPipe(updateReadingValidator))
    updateReadingDto: IUpdateReading,
  ) {
    try {
      const updateReading = await this.readingService.update(
        id,
        updateReadingDto,
      );
      return new SuccessResponse(updateReading);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param('id', new JoiValidationPipe(IdObjectSchema)) id: string) {
    try {
      const removeReading = await this.readingService.remove(id);
      return new SuccessResponse(removeReading);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
