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
import { UpdateOrderDto } from './dto/updeteOrderDto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post()
  createOrder() {
    return this.orderService.createOrder();
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
  async updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    const orderFound = await this.orderService.getOrderById(id);

    if (!orderFound) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    return this.orderService.updateOrder(id, order);
  }
}
