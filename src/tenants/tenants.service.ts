import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantsService {

  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) { }

  async create(createTenantDto: CreateTenantDto) {
    const newTenant = this.tenantRepository.create(createTenantDto);
    await this.tenantRepository.save(newTenant);
    return newTenant;
  }

  async findAll() {
    return this.tenantRepository.find();
  }

}
