import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReviewDto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Post('')
  async createReview(
    //ojo que si no se pasan bien los datos guarda cualquier cosa
    @Query('idClient') idClient: string,
    @Query('idUser') idUser: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const newReview = await this.reviewService.createReview(
      createReviewDto,
      idClient,
      idUser,
    );
    this.reviewService.calculateAverage(idUser);
    return await this.reviewService.getReviewById(newReview.id);
  }
  @Get()
  getAllReviews() {
    return this.reviewService.getReviews();
  }

  @Get(':id')
  getAll30Reviews(@Param('id')id: string) {
    return this.reviewService.getReviewsByUser(id);
  }

  @Get(':id')
  async getReview(@Param('id') id: string) {
    const reviewFound = await this.reviewService.getReviewById(id);
    if (!reviewFound) {
      throw new HttpException('Review does not exist', HttpStatus.NOT_FOUND);
    }
    return reviewFound;
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    const result = await this.reviewService.deleteReview(id);

    if (result.affected === 0) {
      throw new HttpException('Review does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updateReview(@Param('id') id: string, @Body() client: CreateReviewDto) {
    const reviewFound = await this.reviewService.getReviewById(id);

    if (!reviewFound) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    return this.reviewService.updateReview(id, client);
  }
}
