import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AdressService } from './adress.service';
import { CreateAdressDto } from './dto/createAdressDto';

@Controller('adress')
export class AdressController {
  constructor(private adressService: AdressService) {}

  @Post() //no valida que todos los campos sean unicos
  async createAdress(@Body() newAdress: CreateAdressDto) {
    return this.adressService.createAdress(newAdress);
  }

  @Get(':id')
  async getAdressById(@Param('id') id: string) {
    const adressFound = await this.adressService.getAdressById(id);
    if (!adressFound) {
      throw new HttpException('adress does not exist', HttpStatus.NOT_FOUND);
    }
    return adressFound;
  }

  @Get('')
  async getadressByCampos(@Query() adress: CreateAdressDto) {
    const adressFound = await this.adressService.getAdressByCampos(adress);
    if (adressFound.length == 0) {
      throw new HttpException('adress does not exist', HttpStatus.NOT_FOUND);
    }
    return adressFound;
  }

  @Get()
  getAlladresses() {
    return this.adressService.getAdress();
  }

  @Delete(':id')
  async deleteAdress(@Param('id') id: string) {
    const result = await this.adressService.deleteAdress(id);

    if (result.affected === 0) {
      throw new HttpException('adress does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
