import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Order } from 'src/orders/orders.entity';
import { LocalsModule } from 'src/locals/locals.module';
import { Review } from 'src/reviews/reviews.entity';
import { Adress } from 'src/adress/adress.entity';
import { AdressModule } from 'src/adress/adress.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Order, Review, Adress]),
    LocalsModule,
    AdressModule,
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService],
})
export class ClientsModule {}
