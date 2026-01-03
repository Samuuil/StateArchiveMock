import { Test, TestingModule } from '@nestjs/testing';
import { StateArchiveMockService } from './state-archive-mock.service';

describe('StateArchiveMockService', () => {
  let service: StateArchiveMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateArchiveMockService],
    }).compile();

    service = module.get<StateArchiveMockService>(StateArchiveMockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
