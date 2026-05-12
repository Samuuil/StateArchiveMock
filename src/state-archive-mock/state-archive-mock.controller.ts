import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
  } from '@nestjs/common';
  import { StateArchiveMockService } from './state-archive-mock.service';
  import { CreateStateArchiveMockDto } from './dto/create-state-archive-mock.dto';
  import { UpdateStateArchiveMockDto } from './dto/update-state-archive-mock.dto';
  import { StateArchiveMock } from './entities/state-archive-mock.entity';

@Controller('state-archive-mock')
    export class StateArchiveMockController {
    constructor(private readonly stateArchiveService: StateArchiveMockService) {}

    @Post()
    async create(@Body() dto: CreateStateArchiveMockDto): Promise<StateArchiveMock> {
        return await this.stateArchiveService.create(dto);
    }

    @Get()
    async findAll(): Promise<StateArchiveMock[]> {
        return await this.stateArchiveService.findAll();
    }

    @Get('egn/:egn')
    async findByEgn(@Param('egn') egn: string): Promise<StateArchiveMock | null> {
        return await this.stateArchiveService.findByEgn(egn);
    }

    @Get('phone/:phoneNumber')
    async findByPhoneNumber(@Param('phoneNumber') phoneNumber: string): Promise<StateArchiveMock | null> {
        return await this.stateArchiveService.findByPhoneNumber(phoneNumber);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<StateArchiveMock> {
        return await this.stateArchiveService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateStateArchiveMockDto,
    ): Promise<StateArchiveMock> {
        return await this.stateArchiveService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        await this.stateArchiveService.remove(id);
        return { message: 'Archive deleted successfully' };
    }
}   
