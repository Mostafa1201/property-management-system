import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) { }

  async create(createPropertyDto: CreatePropertyDto) {
    const newProperty = this.propertyRepository.create(createPropertyDto);
    await this.propertyRepository.save(newProperty);
    return newProperty;
  }

  async findAll() {
    return this.propertyRepository.find({
      relations: { units: true }
    });
  }
}
