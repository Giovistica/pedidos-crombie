import { Module } from '@nestjs/common';
import { Order } from './orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Client } from 'src/clients/client.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { Restaurant } from 'src/restaurants/restaurants.entity';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { Direccion } from 'src/direccion/direccion.entity';
import { DireccionModule } from 'src/direccion/direccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Client, Restaurant, Direccion]),
    ClientsModule,
    RestaurantsModule,
    DireccionModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
