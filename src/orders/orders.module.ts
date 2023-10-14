import { Module } from '@nestjs/common';
import { Order } from './orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Client } from 'src/clients/client.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { LocalsModule } from 'src/locals/locals.module';
import { Adress } from 'src/adress/adress.entity';
import { AdressModule } from 'src/adress/adress.module';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { DeliverysModule } from 'src/deliverys/deliverys.module';
import { Eatable } from 'src/eatables/eatables.entity';
import { EatablesModule } from 'src/eatables/eatables.module';
import { Payment } from 'src/payments/payments.entity';
import { PaymentsModule } from 'src/payments/payments.module';
import { Local } from 'src/locals/locals.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Client,
      Local,
      Adress,
      Delivery,
      Eatable,
      Payment,
    ]),
    ClientsModule,
    LocalsModule,
    AdressModule,
    DeliverysModule,
    EatablesModule,
    PaymentsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersModule],
})
export class OrdersModule {}
