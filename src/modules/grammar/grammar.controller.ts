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
  UseGuards,
} from '@nestjs/common';
import { GrammarService } from './grammar.service';
import {
  JoiValidationPipe,
  ModifyFilterQueryPipe,
  RemoveEmptyQueryPipe,
  TrimBodyPipe,
} from '@src/commons/pipe';
import {
  createGrammarValidator,
  grammarFilterValidator,
  updateGrammarValidator,
} from './grammar.validator';
import {
  ICreateGrammar,
  IGrammarFilter,
  IUpdateGrammar,
} from './grammar.interface';
import { SuccessResponse } from '@src/commons/helpers/response';
import { IdObjectSchema } from '@src/commons/utils/validator';
import { AuthenticationGuard } from '@src/guards/authentication.guard';

@Controller('grammar')
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(createGrammarValidator))
    body: ICreateGrammar,
  ) {
    try {
      const newGrammar = await this.grammarService.create(body);
      return new SuccessResponse(newGrammar);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll(
    @Query(
      new RemoveEmptyQueryPipe(),
      new JoiValidationPipe(grammarFilterValidator),
      new ModifyFilterQueryPipe(),
    )
    query: IGrammarFilter,
  ) {
    try {
      const [data, total] = await this.grammarService.findAll(query);
      return new SuccessResponse({
        items: data,
        totalItems: total,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new TrimBodyPipe(), new JoiValidationPipe(updateGrammarValidator))
    body: IUpdateGrammar,
  ) {
    try {
      const grammar = await this.grammarService.update(id, body);
      return new SuccessResponse(grammar);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id', new JoiValidationPipe(IdObjectSchema)) id: string) {
    try {
      const removedGrammar = await this.grammarService.remove(id);
      return new SuccessResponse(removedGrammar);
    } catch (error) {
      throw error;
    }
  }
}
