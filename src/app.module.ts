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
import { ReviewsModule } from './reviews/reviews.module';
import { PaymentsModule } from './payments/payments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AddressModule } from './address/address.module';
import { EatablesModule } from './eatables/eatables.module';
import { Client } from './clients/client.entity';
import { Delivery } from './deliverys/deliverys.entity';
import { Eatable } from './eatables/eatables.entity';
import { Orders } from './orders/orders.entity';
import { Payment } from './payments/payments.entity';
import { Local } from './locals/locals.entity';
import { Review } from './reviews/reviews.entity';
import { Vehicle } from './vehicles/vehicles.entity';
import { Address } from './address/address.entity';
import { ProfileReviewsModule } from './profileReviews/profileReviews.module';
import { ProfileReviews } from './profileReviews/profileReviews.entity';
import { AuthModule } from './auth/auth.module';
import { SseController } from './sse/sse.controller';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [
        User,
        Client,
        Address,
        Delivery,
        Eatable,
        Orders,
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
    ReviewsModule,
    PaymentsModule,
    VehiclesModule,
    AddressModule,
    EatablesModule,
    ProfileReviewsModule,
    AuthModule,
    SseModule,
  ],
  controllers: [AppController, SseController],
  providers: [AppService],
})
export class AppModule {}
