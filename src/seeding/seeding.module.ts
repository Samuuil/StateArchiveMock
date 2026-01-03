import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateArchiveMock } from '../state-archive-mock/entities/state-archive-mock.entity';
import { SeedingService } from './seeding.service';
import { StateArchiveSeederService } from './state-archive-mock-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([StateArchiveMock])],
  providers: [SeedingService, StateArchiveSeederService],
  exports: [SeedingService],
})
export class SeedingModule {}

