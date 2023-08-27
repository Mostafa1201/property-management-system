import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database.module';

@Module({
  imports: [TenantsModule,ConfigModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
