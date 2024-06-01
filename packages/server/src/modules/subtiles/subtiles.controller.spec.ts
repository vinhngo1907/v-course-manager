import { Test, TestingModule } from '@nestjs/testing';
import { SubtilesController } from './controller';

describe('SubtilesController', () => {
  let controller: SubtilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtilesController],
    }).compile();

    controller = module.get<SubtilesController>(SubtilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
