import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [VehiclesService],
})
export class VehiclesModule {}
