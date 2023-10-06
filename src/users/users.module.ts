import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/client.entity';
import { Restaurant } from 'src/restaurants/restaurants.entity';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Restaurant])],
  controllers: [UsersController],
  providers: [UsersService, ClientsService, RestaurantsService],
})
export class UsersModule {}
