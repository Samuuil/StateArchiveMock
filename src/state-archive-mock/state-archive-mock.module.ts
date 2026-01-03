import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateArchiveMock } from './entities/state-archive-mock.entity';
import { StateArchiveMockService } from './state-archive-mock.service';
import { StateArchiveMockController } from './state-archive-mock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StateArchiveMock])],
  controllers: [StateArchiveMockController],
  providers: [StateArchiveMockService],
  exports: [StateArchiveMockService],
})
export class StateArchiveModule {}
