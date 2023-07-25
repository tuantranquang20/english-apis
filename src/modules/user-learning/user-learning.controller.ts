import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { UserLearningService } from './user-learning.service';
import { JoiValidationPipe, TrimBodyPipe } from '@src/commons/pipe';
import {
  createUserLearningValidator,
  updateUserLearningValidator,
} from './user-learning.validator';
import {
  ICreateUserLearning,
  IUpdateUserLearning,
} from './user-learning.interface';
import { IdObjectSchema } from '@src/commons/utils/validator';
import { SuccessResponse } from '@src/commons/helpers/response';
import { AuthenticationGuard } from '@src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('user-learning')
export class UserLearningController {
  constructor(private readonly userLearningService: UserLearningService) {}

  @Post()
  async create(
    @Body(
      new TrimBodyPipe(),
      new JoiValidationPipe(createUserLearningValidator),
    )
    body: ICreateUserLearning,
  ) {
    try {
      const newUserLearning = await this.userLearningService.create(body);
      return new SuccessResponse(newUserLearning);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new JoiValidationPipe(IdObjectSchema)) id: string,
    @Body(
      new TrimBodyPipe(),
      new JoiValidationPipe(updateUserLearningValidator),
    )
    body: IUpdateUserLearning,
  ) {
    try {
      const userLearning = await this.userLearningService.update(id, body);
      return new SuccessResponse(userLearning);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
