import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Order } from 'src/orders/orders.entity';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';


@Module({
  imports: [TypeOrmModule.forFeature([Client, Order]), RestaurantsModule],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService],
})
export class ClientsModule {}
