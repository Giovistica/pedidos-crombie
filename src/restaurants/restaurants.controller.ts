import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { EatablesService } from 'src/eatables/eatables.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private restaurantService: RestaurantsService,
    private eatableService: EatablesService,
  ) {}

  // @Post(':id/eatable')
  // async createEstableRes(
  //   @Param('id') id: string,
  //   @Body() eatable: CreateEatableDto,
  // ) {
  //   console.log(id);
  //   const restaurantFound = await this.restaurantService.getRestaurantById(id);
  //   return this.eatableService.createEatable2(eatable, restaurantFound);
  // }
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

  @Get(':id/menus')
  async getEatablesByMenus(@Param('id') id: string) {
    const restaurantFound = await this.restaurantService.getRestaurantById(id);
    if (!restaurantFound) {
      throw new HttpException(
        'Restaurant does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return restaurantFound.menus;
  }

  @Get(':id/menusType/:type')
  async getEatablesByMenuType(
    @Param('id') id: string,
    @Query('type') type: string,
  ) {
    const restaurantFound = await this.restaurantService.getRestaurantById(id);
    if (!restaurantFound) {
      throw new HttpException(
        'Restaurant does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    const menus = restaurantFound.menus.filter(
      (menu) => menu.menuType === type,
    );

    return menus;
  }
  @Get(':id/menusName/:name')
  async getEatablesByMenuName(
    @Param('id') id: string,
    @Query('name') name: string,
  ) {
    const restaurantFound = await this.restaurantService.getRestaurantById(id);
    if (!restaurantFound) {
      throw new HttpException(
        'Restaurant does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    const menus = restaurantFound.menus.filter((menu) => menu.name === name);

    return menus;
  }
}
