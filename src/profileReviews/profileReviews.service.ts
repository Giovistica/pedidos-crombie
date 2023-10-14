import { Injectable } from '@nestjs/common';
import { ProfileReviews } from './profileReviews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileReviewsService {
  constructor(
    @InjectRepository(ProfileReviews)
    private profileReviewsRespository: Repository<ProfileReviews>,
  ) {}

  async createProfileReviews() {
    const newProfileReviews = await this.profileReviewsRespository.create();
    return this.profileReviewsRespository.save(newProfileReviews);
  }
  getAllProfileReviews() {
    return this.profileReviewsRespository.find();
  }

  getProfileReviewsById(id: string) {
    return this.profileReviewsRespository.findOne({
      where: { id },
    });
  }

  deleteProfileReviews(id: string) {
    return this.profileReviewsRespository.delete(id);
  }

  async calculateAveragePunctuation(id: string) {
    const newProfileReviews = await this.getProfileReviewsById(id);

    let average = 0;

    newProfileReviews.reviewsHistory.forEach(
      (review) => (average += review.punctuation),
    );

    newProfileReviews.averagePunctuation =
      average / newProfileReviews.reviewsHistory.length;

    this.profileReviewsRespository.save(newProfileReviews);

    return id;
  }
}
