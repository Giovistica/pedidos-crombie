import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DeliverysModule } from './deliverys/deliverys.module';
import { RewiesModule } from './rewies/rewies.module';
import { PaymentsModule } from './payments/payments.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { DireccionModule } from './direccion/direccion.module';
import { EatablesModule } from './eatables/eatables.module';
import { Client } from './clients/client.entity';
import { Delivery } from './deliverys/deliverys.entity';
import { Eatable } from './eatables/eatables.entity';
import { Order } from './orders/orders.entity';
import { Payment } from './payments/payments.entity';
import { Restaurant } from './restaurants/restaurants.entity';
import { Review } from './rewies/reviews.entity';
import { Vehicle } from './vehicles/vehicles.entity';
import { Direccion } from './direccion/direccion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'prueba',
      entities: [
        User,
        Client,
        Direccion,
        Delivery,
        Eatable,
        Order,
        Payment,
        Restaurant,
        Review,
        Vehicle,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    ClientsModule,
    OrdersModule,
    RestaurantsModule,
    DeliverysModule,
    RewiesModule,
    PaymentsModule,
    VehiclesModule,
    DireccionModule,
    EatablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
