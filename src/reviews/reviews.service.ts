import { CreateReviewDto } from './dto/createReviewDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { ClientsService } from 'src/clients/clients.service';
import { ProfileReviewsService } from 'src/profileReviews/profileReviews.service';
import { Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRespository: Repository<Review>,
    private clientService: ClientsService,
    private profileReviewsService: ProfileReviewsService,
    private orderService: OrdersService,
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    clientId: string,
    Id: string,
    //orderId: string,
  ) {
    const clientFound = await this.clientService.getClientById(clientId);
    const profileFound =
      await this.profileReviewsService.getProfileReviewsById(Id);

    const newReview = this.reviewRespository.create(createReviewDto);
    // const orderFound = await this.orderService.getOrderById(orderId);

    //newReview.order = orderFound;
    newReview.reviewer = clientFound;
    newReview.reviewed = profileFound;

    return this.reviewRespository.save(newReview);
  }
  // async findReviewByOrderAndProfileReview(
  //   orderId: string,
  //   profileReviewId: string,
  // ) {
  //   const review = await this.reviewRespository
  //     .createQueryBuilder('review')
  //     .where('review.orderId = :orderId', { orderId })
  //     .andWhere('review.profileReviewId = :profileReviewId', {
  //       profileReviewId,
  //     })
  //     .getOne();

  //   return review || null;
  // }

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
