import { PartialType } from '@nestjs/mapped-types';
import { CreateListeningDto } from './create-listening.dto';

export class UpdateListeningDto extends PartialType(CreateListeningDto) {}
