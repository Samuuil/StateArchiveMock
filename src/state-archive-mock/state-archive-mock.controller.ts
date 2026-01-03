import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    UseGuards,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
  import { Paginate } from 'nestjs-paginate';
  import type { PaginateQuery } from 'nestjs-paginate';
  import { BasePaginationDto } from '../common/dto/base-pagination.dto';
  import { StateArchiveMockService } from './state-archive-mock.service';
  import { CreateStateArchiveMockDto } from './dto/create-state-archive-mock.dto';
  import { UpdateStateArchiveMockDto } from './dto/update-state-archive-mock.dto';
  import { StateArchiveMock } from './entities/state-archive-mock.entity';

@ApiTags('State Archive Mock')
@Controller('state-archive-mock')
    export class StateArchiveMockController {
    constructor(private readonly stateArchiveService: StateArchiveMockService) {}

    @Post()
    @ApiOperation({ summary: 'Create state archive entry' })
    async create(@Body() dto: CreateStateArchiveMockDto): Promise<StateArchiveMock> {
        return await this.stateArchiveService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all state archive entries' })
    @ApiQuery({ type: BasePaginationDto })
    async findAll(@Paginate() query: PaginateQuery) {
        return await this.stateArchiveService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get state archive entry by ID' })
    async findOne(@Param('id') id: string): Promise<StateArchiveMock> {
        return await this.stateArchiveService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update state archive entry' })
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateStateArchiveMockDto,
    ): Promise<StateArchiveMock> {
        return await this.stateArchiveService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete state archive entry' })
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        await this.stateArchiveService.remove(id);
        return { message: 'Archive deleted successfully' };
    }

    @Get('egn/:egn')
    @ApiOperation({ summary: 'Get state archive entry by EGN' })
    async findByEgn(@Param('egn') egn: string): Promise<StateArchiveMock | null> {
        return await this.stateArchiveService.findByEgn(egn);
    }
}   
