import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './adress.entity';
import { AdressService } from './adress.service';
import { AdressController } from './adress.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Adress])],
  providers: [AdressService],
  controllers: [AdressController],
  exports: [AdressService],
})
export class AdressModule {}
