import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eatable } from './eatables.entity';
import { EatablesService } from './eatables.service';
import { EatablesController } from './eatables.controller';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { Restaurant } from 'src/restaurants/restaurants.entity';
import { Order } from 'src/orders/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Eatable, Restaurant, Order]),
    RestaurantsModule,
  ],
  providers: [EatablesService],
  controllers: [EatablesController],
  exports: [EatablesService],
})
export class EatablesModule {}
