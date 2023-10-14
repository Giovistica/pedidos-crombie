import { CreateReviewDto } from './dto/createReviewDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { ClientsService } from 'src/clients/clients.service';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRespository: Repository<Review>,
    private clientService: ClientsService,
    private profileReviewsService: ProfileReviewsService,
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    clientId: string,
    Id: string,
  ) {
    const clientFound = await this.clientService.getClientById(clientId);
    const profileFound =
      await this.profileReviewsService.getProfileReviewsById(Id);

    const newReview = this.reviewRespository.create(createReviewDto);

    newReview.reviewer = clientFound;
    newReview.reviewed = profileFound;

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

  async calculateAverage(id: string) {
    return this.profileReviewsService.calculateAveragePunctuation(id);
  }
  async getReviewsByProfileReviews(id: string) {
    const profile = await this.profileReviewsService.getProfileReviewsById(id);
    return profile.reviewsHistory.slice(-30);
  }
}
