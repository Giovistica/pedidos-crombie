import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { EatablesService } from 'src/eatables/eatables.service';
import { LocalsService } from './locals.service';
import { findCityDto } from 'src/address/dto/findCityDto';
import { UpdateLocalDto } from './dto/updateLocalDto';
import { CreateAddressDto } from 'src/address/dto/createAddressDto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/enums/role.enum';

@Controller('locals')
export class LocalsController {
  constructor(
    private localService: LocalsService,
    private eatableService: EatablesService,
  ) {}

  @Auth([Roles.ADMIN])
  @Post()
  createLocal() {
    return this.localService.createLocal();
  }
  @Auth([Roles.ADMIN])
  @Get()
  getAllLocals() {
    return this.localService.getLocals();
  }

  @Auth([Roles.CLIENT, Roles.LOCAL])
  @Get(':id/menus')
  async getEatablesByMenus(@Param('id') id: string) {
    const localFound = await this.localService.getLocalById(id);
    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    return localFound.menus;
  }

  @Auth([Roles.CLIENT, Roles.LOCAL])
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
  @Auth([Roles.CLIENT, Roles.LOCAL])
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
  @Auth([Roles.CLIENT])
  @Get('city')
  async getLocalsInCity(@Query('') city: findCityDto) {
    return this.localService.getLocalsInCity(city);
  }
  @Auth([Roles.LOCAL])
  @Patch(':id')
  async updateLocal(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() local: UpdateLocalDto,
  ) {
    return this.localService.updateLocal(id, local);
  }
  @Auth([Roles.LOCAL])
  @Patch(':id/address')
  async addAdressToLocal(
    @Param('id') id: string,
    @Body() address: CreateAddressDto,
  ) {
    return this.localService.AddAdressToLocal(address, id);
  }

  @Auth([Roles.LOCAL])
  @Get('orders/:id')
  async getOrders(@Param('id') id: string) {
    const localFound = await this.localService.getOrdersByLocal(id);
    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    return localFound;
  }
  @Auth([Roles.LOCAL])
  @Get(':id')
  async getLocal(@Param('id') id: string) {
    const localFound = await this.localService.getLocalById(id);
    if (!localFound) {
      throw new HttpException('Local does not exist', HttpStatus.NOT_FOUND);
    }
    return localFound;
  }
}
