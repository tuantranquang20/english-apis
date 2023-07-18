import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLearningDto } from './create-user-learning.dto';

export class UpdateUserLearningDto extends PartialType(CreateUserLearningDto) {}
