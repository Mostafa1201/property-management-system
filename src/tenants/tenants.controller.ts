import { Controller, Get, Post, Body, Param, Put, UseFilters } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { LeaseUnitDto } from './dto/lease-unit.dto';
import { HttpExceptionFilter } from '../errors/http-exception.filter';
import { UnleaseUnitDto } from './dto/unlease-unit.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  @Put('lease')
  @UseFilters(new HttpExceptionFilter())
  leasePropertyUnit(
    @Body() leaseUnitDto: LeaseUnitDto) {
      return this.tenantsService.leaseUnit(leaseUnitDto);
  }

  @Put('unlease')
  @UseFilters(new HttpExceptionFilter())
  unleasePropertyUnit(
    @Body() unleaseUnitDto: UnleaseUnitDto) {
      return this.tenantsService.unleaseUnit(unleaseUnitDto);
  }
}
