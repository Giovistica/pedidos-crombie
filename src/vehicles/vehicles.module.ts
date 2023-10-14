import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { DeliverysService } from 'src/deliverys/deliverys.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Delivery])],
  providers: [VehiclesService, DeliverysService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
