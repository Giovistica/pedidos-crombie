import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './deliverys.entity';
import { DeliverysService } from './deliverys.service';
import { DeliverysController } from './deliverys.controller';
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';
import { Vehicle } from 'src/vehicles/vehicles.entity';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery, ProfileReviews, Vehicle])],
  providers: [DeliverysService, ProfileReviewsService, VehiclesService],
  controllers: [DeliverysController],
  exports: [DeliverysService],
})
export class DeliverysModule {}
