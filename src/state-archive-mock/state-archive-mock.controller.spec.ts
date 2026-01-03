import { Test, TestingModule } from '@nestjs/testing';
import { StateArchiveMockController } from './state-archive-mock.controller';

describe('StateArchiveMockController', () => {
  let controller: StateArchiveMockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateArchiveMockController],
    }).compile();

    controller = module.get<StateArchiveMockController>(StateArchiveMockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
