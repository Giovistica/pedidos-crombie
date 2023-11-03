import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Orders } from 'src/orders/orders.entity';
import { LocalsModule } from 'src/locals/locals.module';
import { Review } from 'src/reviews/reviews.entity';
import { Address } from 'src/address/address.entity';
import { AddressModule } from 'src/address/address.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Orders, Review, Address]),
    LocalsModule,
    AddressModule,
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService],
})
export class ClientsModule {}
