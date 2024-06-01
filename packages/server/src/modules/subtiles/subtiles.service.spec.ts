import { Test, TestingModule } from '@nestjs/testing';
import { SubtilesService } from './service';

describe('SubtilesService', () => {
  let service: SubtilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtilesService],
    }).compile();

    service = module.get<SubtilesService>(SubtilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
