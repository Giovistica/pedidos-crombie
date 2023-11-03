import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddressDto';
import { Roles } from 'src/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Auth([Roles.CLIENT, Roles.LOCAL])
  @Post()
  async createAddress(@Body() newAddress: CreateAddressDto) {
    return this.addressService.createAddress(newAddress);
  }

  @Auth([Roles.CLIENT, Roles.LOCAL])
  @Get('')
  async getaddressByCampos(@Query() address: CreateAddressDto) {
    const addressFound = await this.addressService.getAddressByCampos(address);
    if (addressFound.length == 0) {
      throw new HttpException('address does not exist', HttpStatus.NOT_FOUND);
    }
    return addressFound;
  }

  @Auth([Roles.ADMIN])
  @Get()
  getAlladdresses() {
    return this.addressService.getAddress();
  }
  @Auth([Roles.ADMIN])
  @Delete(':id')
  async deleteAddress(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.addressService.deleteAddress(id);

    if (result.affected === 0) {
      throw new HttpException('address does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
