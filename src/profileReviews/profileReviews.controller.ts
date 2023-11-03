import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ProfileReviewsService } from './profileReviews.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/enums/role.enum';

@Auth([Roles.ADMIN])
@Controller('profileReviews')
export class ProfileReviewsController {
  constructor(private profileReviewsService: ProfileReviewsService) {}
  @Post()
  createProfileReviews() {
    return this.profileReviewsService.createProfileReviews();
  }
  @Get()
  getAllProfileReviewss() {
    return this.profileReviewsService.getAllProfileReviews();
  }

  @Get(':id')
  async getProfileReviews(@Param('id', new ParseUUIDPipe()) id: string) {
    const profileReviewsFound =
      await this.profileReviewsService.getProfileReviewsById(id);
    if (!profileReviewsFound) {
      throw new HttpException(
        'ProfileReviews does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return profileReviewsFound;
  }

  @Delete(':id')
  async deleteProfileReviews(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.profileReviewsService.deleteProfileReviews(id);

    if (result.affected === 0) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
