import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/createReviewDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRespository: Repository<Review>,
  ) {}

  createReview() {
    const newReview = this.reviewRespository.create();
    return this.reviewRespository.save(newReview);
  }
  getReviews() {
    return this.reviewRespository.find();
  }

  getReviewById(id: string) {
    return this.reviewRespository.findOne({
      where: { id },
    });
  }

  deleteReview(id: string) {
    return this.reviewRespository.delete(id);
  }
  async updateReview(id: string, review: CreateReviewDto) {
    return await this.reviewRespository.update({ id }, review);
  }
}
