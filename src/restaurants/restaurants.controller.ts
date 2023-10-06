import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Post()
  createRestaurant() {
    return this.restaurantService.createRestaurant();
  }
  @Get()
  getAllRestaurants() {
    return this.restaurantService.getRestaurant();
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string) {
    const restaurantFound = await this.restaurantService.getRestaurantById(id);
    if (!restaurantFound) {
      throw new HttpException(
        'Restaurant does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return restaurantFound;
  }
}
