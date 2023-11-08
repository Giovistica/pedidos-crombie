import { Module } from '@nestjs/common';
import { Orders } from './orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Client } from 'src/clients/client.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { LocalsModule } from 'src/locals/locals.module';
import { AddressModule } from 'src/address/address.module';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { DeliverysModule } from 'src/deliverys/deliverys.module';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesModule } from 'src/eatables/eatables.module';
import { Payment } from 'src/payments/payments.entity';
import { PaymentsModule } from 'src/payments/payments.module';
import { Local } from 'src/locals/locals.entity';
import { Address } from 'src/address/address.entity';
import { SseModule } from 'src/sse/sse.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orders,
      Client,
      Local,
      Address,
      Delivery,
      Eatable,
      Payment,
    ]),
    ClientsModule,
    LocalsModule,
    AddressModule,
    DeliverysModule,
    EatablesModule,
    PaymentsModule,
    SseModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
