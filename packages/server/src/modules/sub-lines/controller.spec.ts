import { Test, TestingModule } from '@nestjs/testing';
import { SubLinesController } from './controller';

describe('SubLinesController', () => {
  let controller: SubLinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubLinesController],
    }).compile();

    controller = module.get<SubLinesController>(SubLinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
