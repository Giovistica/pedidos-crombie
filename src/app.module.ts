import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { LocalsModule } from './locals/locals.module';
import { DeliverysModule } from './deliverys/deliverys.module';
import { RewiesModule } from './reviews/reviews.module';
import { PaymentsModule } from './payments/payments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AdressModule } from './adress/adress.module';
import { EatablesModule } from './eatables/eatables.module';
import { Client } from './clients/client.entity';
import { Delivery } from './deliverys/deliverys.entity';
import { Eatable } from './eatables/eatables.entity';
import { Order } from './orders/orders.entity';
import { Payment } from './payments/payments.entity';
import { Local } from './locals/locals.entity';
import { Review } from './reviews/reviews.entity';
import { Vehicle } from './vehicles/vehicles.entity';
import { Adress } from './adress/adress.entity';
import { ProfileReviewsModule } from './profileReviews/profileReviews.module';
import { ProfileReviews } from './profileReviews/profileReviews.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.host,
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'prueba',
      entities: [
        User,
        Client,
        Adress,
        Delivery,
        Eatable,
        Order,
        Payment,
        Local,
        ProfileReviews,
        Review,
        Vehicle,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    ClientsModule,
    OrdersModule,
    LocalsModule,
    DeliverysModule,
    RewiesModule,
    PaymentsModule,
    VehiclesModule,
    AdressModule,
    EatablesModule,
    ProfileReviewsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
