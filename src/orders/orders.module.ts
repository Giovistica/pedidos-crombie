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
import { Delivery } from 'src/deliverys/deliverys.entity';
import { DeliverysModule } from 'src/deliverys/deliverys.module';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesModule } from 'src/eatables/eatables.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Client,
      Restaurant,
      Direccion,
      Delivery,
      Eatable,
    ]),
    ClientsModule,
    RestaurantsModule,
    DireccionModule,
    DeliverysModule,
    EatablesModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersModule],
})
export class OrdersModule {}
