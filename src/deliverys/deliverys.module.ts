import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './deliverys.entity';

@Module({ imports: [TypeOrmModule.forFeature([Delivery])] })
export class DeliverysModule {}
