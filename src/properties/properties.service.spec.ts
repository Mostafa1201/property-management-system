import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { MockType, propertyRepositoryMockFactory } from '../common/baseTest';
import { Repository } from 'typeorm';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repositoryMock: MockType<Repository<Property>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useFactory: propertyRepositoryMockFactory
        }
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    repositoryMock = module.get(getRepositoryToken(Property));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create property', async () => {
    const property = { propertyName: "Aaamar property 1", location: "33.232.1232" };
    repositoryMock.create.mockReturnValue(property);
    expect(await service.create(property)).toEqual(property);
    expect(repositoryMock.create).toHaveBeenCalledWith(property);
  });
});
