import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './deliverys.entity';
import { DeliverysService } from './deliverys.service';
import { DeliverysController } from './deliverys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  providers: [DeliverysService],
  controllers: [DeliverysController],
  exports: [DeliverysService],
})
export class DeliverysModule {}
