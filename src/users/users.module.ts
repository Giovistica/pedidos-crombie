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
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Client,
      Local,
      Delivery,
      Adress,
      LocalsService,
      ProfileReviews,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ClientsService,
    LocalsService,
    DeliverysService,
    AdressService,
    LocalsService,
    ProfileReviewsService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
