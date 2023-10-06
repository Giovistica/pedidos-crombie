import { Module } from '@nestjs/common';
import { Order } from './orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Order])] })
export class OrdersModule {}
