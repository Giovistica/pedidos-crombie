import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReviewDto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/enums/role.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Auth([Roles.CLIENT])
  @Post(':idClient/:idProfile')
  async createReview(
    //ojo que si no se pasan bien los datos guarda cualquier cosa
    @Param('idClient') idClient: string,
    @Param('idProfile') idUser: string,
    //@Param('idOrder') idOrder: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    console.log(createReviewDto);
    const newReview = await this.reviewService.createReview(
      createReviewDto,
      idClient,
      idUser,
      //idOrder,
    );
    //this.reviewService.calculateAverage(idUser);
    return await this.reviewService.getReviewById(newReview.id);
  }

  // @Auth([Roles.LOCAL, Roles.DELIVERY])
  // @Get(':id')
  // async getReviewByOrder(
  //   @Param('idOrder') idOrder: string,
  //   @Param('idProfile') idProfile: string,
  // ) {
  //   return this.reviewService.findReviewByOrderAndProfileReview(
  //     idOrder,
  //     idProfile,
  //   );
  // }

  @Auth([Roles.LOCAL, Roles.DELIVERY])
  @Get(':id')
  getAll30Reviews(@Param('id') id: string) {
    return this.reviewService.getReviewsByProfileReviews(id);
  }

  @Auth([Roles.ADMIN])
  @Get()
  getAllReviews() {
    return this.reviewService.getReviews();
  }

  @Auth([Roles.LOCAL, Roles.DELIVERY])
  @Get(':id')
  async getReview(@Param('id') id: string) {
    const reviewFound = await this.reviewService.getReviewById(id);
    if (!reviewFound) {
      throw new HttpException('Review does not exist', HttpStatus.NOT_FOUND);
    }
    return reviewFound;
  }

  @Auth([Roles.ADMIN])
  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    const result = await this.reviewService.deleteReview(id);

    if (result.affected === 0) {
      throw new HttpException('Review does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
