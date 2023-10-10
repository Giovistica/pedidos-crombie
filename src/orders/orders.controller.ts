import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { DireccionService } from 'src/direccion/direccion.service';
import { direccionDto } from 'src/direccion/dto/direccionDto';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private direccionService: DireccionService,
  ) {}

  @Post('')
  async createOrder(@Body() order: CreateOrderDto) {
    return await this.orderService.createOrder(order);
  }
  @Get()
  getAllOrders() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return orderFound;
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    const result = await this.orderService.deleteOrder(id);

    if (result.affected === 0) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updateOrderDireccion(
    @Param('id') id: string,
    @Body() direccion: direccionDto,
  ) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return this.orderService.updateOrderDireccion(orderFound, direccion);
  }
}
