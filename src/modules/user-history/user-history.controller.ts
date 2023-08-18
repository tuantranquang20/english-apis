import {
  Controller,
  Post,
  Body,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserHistoryService } from './user-history.service';
import { JoiValidationPipe, TrimBodyPipe } from '@src/commons/pipe';
import { ICreateUserHistory } from './user-history.interface';
import { createUserHistoryValidator } from './user-history.validator';
import { AuthenticationGuard } from '@src/guards/authentication.guard';
import { SuccessResponse } from '@src/commons/helpers/response';

@UseGuards(AuthenticationGuard)
@Controller('user-history')
export class UserHistoryController {
  constructor(private readonly userHistoryService: UserHistoryService) {}

  @Post()
  async create(
    @Body(new TrimBodyPipe(), new JoiValidationPipe(createUserHistoryValidator))
    body: ICreateUserHistory,
  ) {
    try {
      const newUserHistory = await this.userHistoryService.create(body);
      return new SuccessResponse(newUserHistory);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
