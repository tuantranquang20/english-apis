import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListeningService } from './listening.service';

@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Post()
  create(@Body() createListeningDto) {
    return this.listeningService.create(createListeningDto);
  }

  @Get()
  findAll() {
    return this.listeningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listeningService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListeningDto) {
    return this.listeningService.update(+id, updateListeningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listeningService.remove(+id);
  }
}
