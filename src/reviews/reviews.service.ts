import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/createReviewDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { ClientsService } from 'src/clients/clients.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRespository: Repository<Review>,
    private clientService: ClientsService,
    private userService: UsersService,
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    clientId: string,
    userId: string,
  ) {
    const clientFound = await this.clientService.getClientById(clientId);
    const userFound = await this.userService.getUserById(userId);

    if (userFound.role === 'CLIENT') {
      throw new HttpException(
        'That user can not be reviewed',
        HttpStatus.FORBIDDEN,
      );
    }
    const newReview = this.reviewRespository.create(createReviewDto);

    newReview.reviewer = clientFound;
    newReview.reviewed = userFound;

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
  async calculateAverage(id: string) {
    return this.userService.calculateAveragePunctuation(id);
  }
  async getReviewsByUser(id: string) {
    const user = await this.userService.getUserById(id);
    return user.reviewsHistory.slice(-30);
  }
}
