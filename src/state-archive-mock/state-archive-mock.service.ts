import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateArchiveMock } from './entities/state-archive-mock.entity';
import { CreateStateArchiveMockDto } from './dto/create-state-archive-mock.dto';
import { UpdateStateArchiveMockDto } from './dto/update-state-archive-mock.dto';
import { StateArchiveErrorCode, StateArchiveErrorMessages } from './error/state_archive_mock_errors.enum';

@Injectable()
export class StateArchiveMockService {
  private readonly logger = new Logger(StateArchiveMockService.name);

  constructor(
    @InjectRepository(StateArchiveMock)
    private readonly archiveRepo: Repository<StateArchiveMock>,
  ) {}

  async create(createDto: CreateStateArchiveMockDto): Promise<StateArchiveMock> {
    try {
      const existing = await this.archiveRepo.findOne({ where: { egn: createDto.egn } });
      if (existing) {
        throw new ConflictException({
          code: StateArchiveErrorCode.EGN_ALREADY_EXISTS,
          message: StateArchiveErrorMessages[StateArchiveErrorCode.EGN_ALREADY_EXISTS],
        });
      }
      const archive = this.archiveRepo.create(createDto);
      return await this.archiveRepo.save(archive);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`${StateArchiveErrorMessages[StateArchiveErrorCode.STATE_ARCHIVE_CREATION_FAILED]}: ${error.message}`, error.stack);
      throw new InternalServerErrorException({
        code: StateArchiveErrorCode.STATE_ARCHIVE_CREATION_FAILED,
        message: StateArchiveErrorMessages[StateArchiveErrorCode.STATE_ARCHIVE_CREATION_FAILED],
      });
    }
  }

  async findAll(): Promise<StateArchiveMock[]> {
    try {
      return await this.archiveRepo.find({
        order: { fullName: 'ASC' },
      });
    } catch (error) {
      this.logger.error(`${StateArchiveErrorMessages[StateArchiveErrorCode.DATABASE_ERROR]}: ${error.message}`, error.stack);
      throw new InternalServerErrorException({
        code: StateArchiveErrorCode.DATABASE_ERROR,
        message: StateArchiveErrorMessages[StateArchiveErrorCode.DATABASE_ERROR],
      });
    }
  }

  async findOne(id: string): Promise<StateArchiveMock> {
    try {
      const archive = await this.archiveRepo.findOne({ where: { id } });
      if (!archive) {
        throw new NotFoundException({
          code: StateArchiveErrorCode.STATE_ARCHIVE_NOT_FOUND,
          message: StateArchiveErrorMessages[StateArchiveErrorCode.STATE_ARCHIVE_NOT_FOUND],
        });
      }
      return archive;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`${StateArchiveErrorMessages[StateArchiveErrorCode.DATABASE_ERROR]}: ${error.message}`, error.stack);
      throw new InternalServerErrorException({
        code: StateArchiveErrorCode.DATABASE_ERROR,
        message: StateArchiveErrorMessages[StateArchiveErrorCode.DATABASE_ERROR],
      });
    }
  }

  async update(id: string, updateDto: UpdateStateArchiveMockDto): Promise<StateArchiveMock> {
    try {
      const archive = await this.findOne(id);
      if (updateDto.egn && updateDto.egn !== archive.egn) {
        const existing = await this.archiveRepo.findOne({ where: { egn: updateDto.egn } });
        if (existing) {
          throw new ConflictException({
            code: StateArchiveErrorCode.EGN_ALREADY_EXISTS,
            message: StateArchiveErrorMessages[StateArchiveErrorCode.EGN_ALREADY_EXISTS],
          });
        }
      }
      Object.assign(archive, updateDto);
      return await this.archiveRepo.save(archive);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`${StateArchiveErrorMessages[StateArchiveErrorCode.STATE_ARCHIVE_UPDATE_FAILED]}: ${error.message}`, error.stack);
      throw new InternalServerErrorException({
        code: StateArchiveErrorCode.STATE_ARCHIVE_UPDATE_FAILED,
        message: StateArchiveErrorMessages[StateArchiveErrorCode.STATE_ARCHIVE_UPDATE_FAILED],
      });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const archive = await this.findOne(id);
      await this.archiveRepo.remove(archive);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`${StateArchiveErrorMessages[StateArchiveErrorCode.STATE_ARCHIVE_DELETE_FAILED]}: ${error.message}`, error.stack);
      throw new InternalServerErrorException({
        code: StateArchiveErrorCode.STATE_ARCHIVE_DELETE_FAILED,
        message: StateArchiveErrorMessages[StateArchiveErrorCode.STATE_ARCHIVE_DELETE_FAILED],
      });
    }
  }

  async findByEgn(egn: string): Promise<StateArchiveMock | null> {
    try {
      return await this.archiveRepo.findOne({ where: { egn } });
    } catch (error) {
      this.logger.error(`${StateArchiveErrorMessages[StateArchiveErrorCode.DATABASE_ERROR]}: ${error.message}`, error.stack);
      throw new InternalServerErrorException({
        code: StateArchiveErrorCode.DATABASE_ERROR,
        message: StateArchiveErrorMessages[StateArchiveErrorCode.DATABASE_ERROR],
      });
    }
  }
}
