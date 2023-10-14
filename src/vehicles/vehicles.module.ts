import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Delivery, ProfileReviews])],
  providers: [VehiclesService, DeliverysService, ProfileReviewsService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
