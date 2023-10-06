import { Module } from '@nestjs/common';
import { Restaurant } from './restaurants.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Restaurant])] })
export class RestaurantsModule {}
