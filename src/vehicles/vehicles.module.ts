import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
