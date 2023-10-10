import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/client.entity';
import { Restaurant } from 'src/restaurants/restaurants.entity';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { Direccion } from 'src/direccion/direccion.entity';
import { DireccionService } from 'src/direccion/direccion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Restaurant, Delivery, Direccion]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ClientsService,
    RestaurantsService,
    DeliverysService,
    DireccionService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
