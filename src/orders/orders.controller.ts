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
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { direccionDto } from 'src/direccion/dto/direccionDto';
import { UpdateOrderDeliveryDto } from './dto/updateOrderDeliveryDto';
import { UpdateOrderStatusDto } from './dto/updeteOrderDto';
import { findCityDto } from 'src/direccion/dto/findCityDto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post('')
  async createOrder(@Body() order: CreateOrderDto) {
    return await this.orderService.createOrder(order);
  }
  @Get()
  getAllOrders() {
    return this.orderService.getOrders();
  }

  @Get('prep/city')
  async getOrdersPrep(@Query() city: findCityDto) {
    return await this.orderService.getOrdersOnPrep(city);
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

  @Patch(':id/direccion')
  async updateOrderDelivery(
    @Param('id') id: string,
    @Body() direccion: direccionDto,
  ) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return this.orderService.updateOrderDireccion(orderFound, direccion);
  }

  @Patch(':id/delivery')
  async updateOrderDireccion(
    @Param('id') id: string,
    @Body() idDelivery: UpdateOrderDeliveryDto,
  ) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return this.orderService.updateOrderDelivery(orderFound, idDelivery);
  }
  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() status: UpdateOrderStatusDto,
  ) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    const orderUpdated = await this.orderService.updateOrderStatus(id, status);
    if (orderUpdated.affected === 1) {
      throw new HttpException('Status updated!', HttpStatus.CREATED);
    }
  }

  @Patch(':id/eatable')
  async addEatableToOrder(
    @Param('id') idOrder: string,
    @Query('idEatable') idEatable: string,
  ) {
    const orderFound = await this.orderService.getOrderById(idOrder);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    const orderEatableAdded = await this.orderService.orderEatableAdd(
      orderFound,
      idEatable,
    );

    return orderEatableAdded;
  }
  @Delete(':id/eatable')
  async deleteEatableToOrder(
    @Param('id') idOrder: string,
    @Query('idEatable') idEatable: string,
  ) {
    const orderFound = await this.orderService.getOrderById(idOrder);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    const orderEatableRemoved = await this.orderService.orderEatableAdd(
      orderFound,
      idEatable,
    );

    return orderEatableRemoved;
  }
}
