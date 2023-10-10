import { Module } from '@nestjs/common';
import { Restaurant } from './restaurants.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesService } from 'src/eatables/eatables.service';


@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Eatable])],
  providers: [RestaurantsService, EatablesService],
  controllers: [RestaurantsController],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
