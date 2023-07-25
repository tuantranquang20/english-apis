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
import { ListeningService } from './listening.service';

@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Post()
  async create(@Body() createListeningDto) {
    try {
      return this.listeningService.create(createListeningDto);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get()
  async findAll() {
    try {
      return this.listeningService.findAll();
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.listeningService.findOne(+id);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListeningDto) {
    try {
      return this.listeningService.update(+id, updateListeningDto);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.listeningService.remove(+id);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
