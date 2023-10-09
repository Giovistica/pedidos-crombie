import { Module } from '@nestjs/common';
import { Order } from './orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({ imports: [TypeOrmModule.forFeature([Order])], providers: [OrdersService], controllers: [OrdersController] })
export class OrdersModule {}
