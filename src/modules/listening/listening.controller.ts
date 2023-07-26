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
import { ICreateListening, IUpdateListening } from './listening.interface';
import { ListeningService } from './listening.service';
import {
  createListeningValidator,
  listeningFilterValidator,
  updateListeningValidator,
} from './listening.validator';

@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Post('create')
  async create(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(createListeningValidator))
    createListeningDto: ICreateListening,
  ) {
    try {
      const newReading = await this.listeningService.create(createListeningDto);
      return new SuccessResponse(newReading);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  @Get()
  async findAll(
    @Query(
      new RemoveEmptyQueryPipe(),
      new JoiValidationPipe(listeningFilterValidator),
      new ModifyFilterQueryPipe(),
    )
    query: any,
  ) {
    try {
      const listenings = await this.listeningService.findAll(query);
      return new SuccessResponse(listenings);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', new JoiValidationPipe(IdObjectSchema)) id: string,
  ) {
    try {
      const listening = await this.listeningService.findOne(id);
      return new SuccessResponse(listening);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Patch('/update/:id')
  async update(
    @Param('id', new JoiValidationPipe(IdObjectSchema)) id: string,
    @Body(new TrimBodyPipe(), new JoiValidationPipe(updateListeningValidator))
    updateListeningDto: IUpdateListening,
  ) {
    try {
      const updateListening = await this.listeningService.update(
        id,
        updateListeningDto,
      );
      return new SuccessResponse(updateListening);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param('id', new JoiValidationPipe(IdObjectSchema)) id: string) {
    try {
      const removeListening = await this.listeningService.remove(id);
      return new SuccessResponse(removeListening);
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}
