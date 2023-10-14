import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { EatablesService } from 'src/eatables/eatables.service';
import { LocalsService } from './locals.service';
import { findCityDto } from 'src/adress/dto/findCityDto';

@Controller('locals')
export class LocalsController {
  constructor(
    private localService: LocalsService,
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
  createLocal() {
    return this.localService.createLocal();
  }
  @Get()
  getAllLocals() {
    return this.localService.getLocals();
  }

  @Get(':id')
  async getLocal(@Param('id') id: string) {
    const localFound = await this.localService.getLocalById(id);
    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    return localFound;
  }

  @Get(':id/menus')
  async getEatablesByMenus(@Param('id') id: string) {
    const localFound = await this.localService.getLocalById(id);
    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    return localFound.menus;
  }

  @Get(':id/menusType/:type')
  async getEatablesByMenuType(
    @Param('id') id: string,
    @Query('type') type: string,
  ) {
    const localFound = await this.localService.getLocalById(id);
    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    const menus = localFound.menus.filter((menu) => menu.menuType === type);

    return menus;
  }
  @Get(':id/menusName/:name')
  async getEatablesByMenuName(
    @Param('id') id: string,
    @Query('name') name: string,
  ) {
    const localFound = await this.localService.getLocalById(id);
    if (!localFound) {
      throw new HttpException(
        'Restaurant does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    const menus = localFound.menus.filter((menu) => menu.name === name);

    return menus;
  }

  @Get('locals/city')
  async getLocalsInCity(@Query('') city: findCityDto) {
    console.log(city);
    return this.localService.getLocalsInCity(city);
  }
}