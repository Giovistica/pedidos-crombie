import { Module } from '@nestjs/common';
import { Review } from './reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Client } from 'src/clients/client.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';
import { ProfileReviewsModule } from 'src/profileReviews/profileReviews.module';
import { Orders } from 'src/orders/orders.entity';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Client, ProfileReviews, Orders]),
    OrdersModule,
    ClientsModule,
    ProfileReviewsModule,
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
