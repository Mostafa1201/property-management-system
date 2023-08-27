import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { HttpMessageConstants } from '../utils/Constants';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    const property = await this.propertyRepository.findOne({
      where: {
        id: createUnitDto.propertyId
      }
    });
    if(!property){
      throw new NotFoundException(HttpMessageConstants.PROPERTY_NOT_FOUND);
    }
    const newUnit = this.unitRepository.create(createUnitDto);
    await this.unitRepository.save(newUnit);
    return newUnit;
  }

  async findAll() {
    return this.unitRepository.find({
      relations: { tenant: true }
    });
  }
}
