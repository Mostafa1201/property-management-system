import { Test, TestingModule } from '@nestjs/testing';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { Repository } from 'typeorm';

describe('UnitsController', () => {
  let controller: UnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitsController],
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

    controller = module.get<UnitsController>(UnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
