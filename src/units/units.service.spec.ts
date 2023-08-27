import { Test, TestingModule } from '@nestjs/testing';
import { UnitsService } from './units.service';
import { Repository } from 'typeorm';

describe('UnitsService', () => {
  let service: UnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitsService,
        {
          provide: 'UnitRepository',
          useClass: Repository,
        },
        {
          provide: 'PropertyRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UnitsService>(UnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
