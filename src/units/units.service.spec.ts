import { Test, TestingModule } from '@nestjs/testing';
import { UnitsService } from './units.service';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PropertiesService } from '../properties/properties.service';
import { MockType, propertyRepositoryMockFactory, unitRepositoryMockFactory } from '../common/baseTest';
import { Property } from '../properties/entities/property.entity';
import { UnitStatus } from './interfaces/unit.interface';

describe('UnitsService', () => {
  let propertyService: PropertiesService;
  let unitsService: UnitsService;
  let unitRepositoryMock: MockType<Repository<Unit>>;
  let propertyRepositoryMock: MockType<Repository<Property>>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitsService,
        PropertiesService,
        {
          provide: getRepositoryToken(Unit),
          useFactory: unitRepositoryMockFactory
        },
        {
          provide: getRepositoryToken(Property),
          useFactory: propertyRepositoryMockFactory
        },
      ],
    }).compile();

    unitsService = module.get<UnitsService>(UnitsService);
    propertyService = module.get<PropertiesService>(PropertiesService);

    unitRepositoryMock = module.get(getRepositoryToken(Unit));
    propertyRepositoryMock = module.get(getRepositoryToken(Property));    
  });

  it('should be defined', () => {
    expect(unitsService).toBeDefined();
  });

  it('should return 404 error', async () => {
    propertyRepositoryMock.findOne = jest.fn(() => null)
    const unitRequestData = { tenantId: null, propertyId: -232 ,numOfRooms: 2, pricePerSquareMeter: 3.5, status: UnitStatus.vacant };
    unitRepositoryMock.create.mockReturnValue(unitRequestData);
    try {
      let response = await unitsService.create(unitRequestData);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("unit must belong to a property, propertyId provided is not found");
    }
  });

  it('should create unit', async () => {

    const propertyRequestData = { propertyName: "Aaamar property 1", location: "33.232.1232" };
    propertyRepositoryMock.create.mockReturnValue(propertyRequestData);
    let property = await propertyService.create(propertyRequestData) as Property;
    property.id = 1;
    
    const unitRequestData = { tenantId: null, propertyId: property.id ,numOfRooms: 2, pricePerSquareMeter: 3.5, status: UnitStatus.vacant };
    unitRepositoryMock.create.mockReturnValue(unitRequestData);
    expect(await unitsService.create(unitRequestData)).toEqual(unitRequestData);
    expect(unitRepositoryMock.create).toHaveBeenCalledWith(unitRequestData);
  });
});
