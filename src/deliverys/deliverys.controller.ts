import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DeliverysService } from './deliverys.service';
import { Roles } from 'src/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('deliverys')
export class DeliverysController {
  constructor(private deliveryService: DeliverysService) {}

  @Auth([Roles.ADMIN])
  @Post()
  createDelivery() {
    return this.deliveryService.createDelivery();
  }
  @Auth([Roles.ADMIN])
  @Get()
  getAllDeliverys() {
    return this.deliveryService.getDeliverys();
  }
  @Auth([Roles.DELIVERY, Roles.CLIENT])
  @Get(':id')
  async getDelivery(@Param('id', new ParseUUIDPipe()) id: string) {
    const deliveryFound = await this.deliveryService.getDeliveryById(id);
    if (!deliveryFound) {
      throw new HttpException('Delivery does not exist', HttpStatus.NOT_FOUND);
    }
    return deliveryFound;
  }
}
