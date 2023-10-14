import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/client.entity';
import { DeliverysService } from 'src/deliverys/deliverys.service';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { LocalsService } from 'src/locals/locals.service';
import { Local } from 'src/locals/locals.entity';
import { Adress } from 'src/adress/adress.entity';
import { AdressService } from 'src/adress/adress.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Local, Delivery, Adress])],
  controllers: [UsersController],
  providers: [
    UsersService,
    ClientsService,
    LocalsService,
    DeliverysService,
    AdressService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
