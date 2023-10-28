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

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post() //no valida que todos los campos sean unicos
  async createAddress(@Body() newAddress: CreateAddressDto) {
    return this.addressService.createAddress(newAddress);
  }

  // @Get(':id')
  // async getAddressById(@Param('id') id: string) {
  //   const addressFound = await this.addressService.getAddressById(id);
  //   if (!addressFound) {
  //     throw new HttpException('address does not exist', HttpStatus.NOT_FOUND);
  //   }
  //   return addressFound;
  // }

  @Get('')
  async getaddressByCampos(@Query() address: CreateAddressDto) {
    const addressFound = await this.addressService.getAddressByCampos(address);
    if (addressFound.length == 0) {
      throw new HttpException('address does not exist', HttpStatus.NOT_FOUND);
    }
    return addressFound;
  }

  @Get()
  getAlladdresses() {
    return this.addressService.getAddress();
  }

  @Delete(':id')
  async deleteAddress(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.addressService.deleteAddress(id);

    if (result.affected === 0) {
      throw new HttpException('address does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
