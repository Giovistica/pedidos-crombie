import { Module } from '@nestjs/common';
import { ProfileReviewsService } from './profileReviews.service';
import { ProfileReviewsController } from './profileReviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileReviews } from './profileReviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileReviews])],
  providers: [ProfileReviewsService],
  controllers: [ProfileReviewsController],
  exports: [ProfileReviewsService],
})
export class ProfileReviewsModule {}
