import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eatable } from './eatables.entity';
import { EatablesService } from './eatables.service';
import { EatablesController } from './eatables.controller';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { Restaurant } from 'src/restaurants/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Eatable, Restaurant]), RestaurantsModule],
  providers: [EatablesService],
  controllers: [EatablesController],
})
export class EatablesModule {}
