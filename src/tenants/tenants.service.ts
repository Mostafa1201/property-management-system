import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';
import { LeaseUnitDto } from './dto/lease-unit.dto';
import { Unit } from '../units/entities/unit.entity';
import { UnleaseUnitDto } from './dto/unlease-unit.dto';
import { HttpMessageConstants } from '../utils/Constants';

@Injectable()
export class TenantsService {

  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) { }

  async create(createTenantDto: CreateTenantDto) {
    const newTenant = this.tenantRepository.create(createTenantDto);
    await this.tenantRepository.save(newTenant);
    return newTenant;
  }

  async leaseUnit(leaseUnitDto: LeaseUnitDto){
    const { tenantId , unitId } = leaseUnitDto;
    const tenant = await this.tenantRepository.findOne({
      where: {
        id: tenantId
      }
    });
    if(!tenant){
      throw new NotFoundException(HttpMessageConstants.TENANT_NOT_FOUND);
    }
    const unit = await this.unitRepository.findOne({
      where: {
        id: unitId
      }
    });
    if(!unit){
      throw new NotFoundException(HttpMessageConstants.UNIT_NOT_FOUND);
    }
    if(unit.tenantId){
      throw new ConflictException(HttpMessageConstants.UNIT_ALREADY_LEASED);
    }
    let updatedUnit = {
      ...unit,
      tenant
    };
    this.unitRepository.save(updatedUnit)
    return updatedUnit;
  }

  async unleaseUnit(unleaseUnitDto: UnleaseUnitDto){
    const { unitId } = unleaseUnitDto;
    const unit = await this.unitRepository.findOne({
      where: {
        id: unitId
      }
    });
    if(!unit){
      throw new NotFoundException(HttpMessageConstants.UNIT_NOT_FOUND);
    }
    if(!unit.tenantId){
      throw new ConflictException(HttpMessageConstants.UNIT_ALREADY_UNLEASED);
    }
    let updatedUnit = {
      ...unit,
      tenant: null,
      tenantId: null
    };
    this.unitRepository.save(updatedUnit)
    return updatedUnit;
  }

  async findAll() {
    return this.tenantRepository.find({
      relations: { units: true }
    });
  }

}
