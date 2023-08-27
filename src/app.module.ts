import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './common/database.module';
import { PropertiesModule } from './properties/properties.module';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [TenantsModule,ConfigModule,DatabaseModule, PropertiesModule, UnitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
