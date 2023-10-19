import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { DeliverysService } from './deliverys.service';

@Controller('deliverys')
export class DeliverysController {
  constructor(private deliveryService: DeliverysService) {}

  @Post()
  createDelivery() {
    return this.deliveryService.createDelivery();
  }
  @Get()
  getAllDeliverys() {
    return this.deliveryService.getDeliverys();
  }

  @Get(':id')
  async getDelivery(@Param('id') id: string) {
    const deliveryFound = await this.deliveryService.getDeliveryById(id);
    if (!deliveryFound) {
      throw new HttpException('Delivery does not exist', HttpStatus.NOT_FOUND);
    }
    return deliveryFound;

  }

  
}
