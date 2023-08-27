import { Test, TestingModule } from '@nestjs/testing';
import { TenantsService } from './tenants.service';
import { PropertiesService } from '../properties/properties.service';

import { Repository } from 'typeorm';
import { MockType, propertyRepositoryMockFactory, tenantRepositoryMockFactory, unitRepositoryMockFactory } from '../common/baseTest';
import { Tenant } from './entities/tenant.entity';
import { Unit } from '../units/entities/unit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Property } from '../properties/entities/property.entity';
import { UnitsService } from '../units/units.service';
import { UnitStatus } from '../units/interfaces/unit.interface';

describe('TenantsService', () => {
  let tenantService: TenantsService;
  let propertyService: PropertiesService;
  let unitsService: UnitsService;

  let propertyRepositoryMock: MockType<Repository<Property>>;
  let tenantRepositoryMock: MockType<Repository<Tenant>>;
  let unitRepositoryMock: MockType<Repository<Unit>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantsService,
        PropertiesService,
        UnitsService,
        {
          provide: getRepositoryToken(Tenant),
          useFactory: tenantRepositoryMockFactory
        },
        {
          provide: getRepositoryToken(Unit),
          useFactory: unitRepositoryMockFactory
        },
        {
          provide: getRepositoryToken(Property),
          useFactory: propertyRepositoryMockFactory
        }
      ],
    }).compile();

    tenantService = module.get<TenantsService>(TenantsService);
    propertyService = module.get<PropertiesService>(PropertiesService);
    unitsService = module.get<UnitsService>(UnitsService);

    propertyRepositoryMock = module.get(getRepositoryToken(Property));
    tenantRepositoryMock = module.get(getRepositoryToken(Tenant));
    unitRepositoryMock = module.get(getRepositoryToken(Unit));
  });

  it('should be defined', () => {
    expect(tenantService).toBeDefined();
  });

  it('should lease property unit by a tenant', async () => {
    const propertyRequestData = { propertyName: "Aaamar property 1", location: "33.232.1232" };
    propertyRepositoryMock.create.mockReturnValue(propertyRequestData);
    let property = await propertyService.create(propertyRequestData) as Property;
    property.id = 1;

    const tenantRequestData = { id: 1,fullName: "Mostafa", email: "mostafa@gmail.com", phone: "01023012" };
    tenantRepositoryMock.create.mockReturnValue(tenantRequestData);
    let tenant = await tenantService.create(tenantRequestData) as Tenant;

    const unitRequestData = { tenantId: tenant.id, propertyId: property.id ,numOfRooms: 2, pricePerSquareMeter: 3.5, status: UnitStatus.vacant };
    unitRepositoryMock.create.mockReturnValue(unitRequestData);
    let unit = await unitsService.create(unitRequestData);
    unit.id = 1;
    let unitUpdated = await tenantService.leaseUnit({ tenantId: tenant.id, unitId: unit.id });
    expect(unitUpdated.tenant.id).toEqual(tenant.id);
  });
});
