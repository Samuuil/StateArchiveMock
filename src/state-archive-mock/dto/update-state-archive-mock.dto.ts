import { PartialType } from '@nestjs/mapped-types';
import { CreateStateArchiveMockDto } from './create-state-archive-mock.dto';

export class UpdateStateArchiveMockDto extends PartialType(CreateStateArchiveMockDto) {}
