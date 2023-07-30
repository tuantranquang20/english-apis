import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserLearningService } from './user-learning.service';
import { JoiValidationPipe, TrimBodyPipe } from '@src/commons/pipe';
import { createUserLearningValidator } from './user-learning.validator';
import { ICreateUserLearning } from './user-learning.interface';
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
    @Req() req,
  ) {
    try {
      const newUserLearning = await this.userLearningService.create({
        ...body,
        userId: req?.user?.id,
      });
      return new SuccessResponse(newUserLearning);
    } catch (error) {
      console.log(error)
      return new InternalServerErrorException();
    }
  }
}
