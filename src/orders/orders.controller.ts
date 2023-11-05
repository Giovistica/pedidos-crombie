import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrderDto';
import { UpdateOrderDeliveryDto } from './dto/updateOrderDeliveryDto';
import { UpdateOrderStatusDto } from './dto/updeteOrderDto';
import { findCityDto } from 'src/address/dto/findCityDto';
import { CreateAddressDto } from 'src/address/dto/createAddressDto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/enums/role.enum';
import { SseService } from 'src/sse/sse.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private sseService: SseService,
  ) {}

  @Auth([Roles.CLIENT])
  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    return await this.orderService.createOrder(order);
  }
  @Auth([Roles.ADMIN])
  @Get()
  getAllOrders() {
    return this.orderService.getOrders();
  }

  @Auth([Roles.DELIVERY])
  @Get('prep/city')
  async getOrdersPrep(@Query() city: findCityDto) {
    return await this.orderService.getOrdersOnPrep(city);
  }

  @Auth([Roles.CLIENT, Roles.DELIVERY, Roles.LOCAL])
  @Get(':id')
  async getOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return orderFound;
  }

  @Auth([Roles.CLIENT])
  @Delete(':id')
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.orderService.deleteOrder(id);

    if (result.affected === 0) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Auth([Roles.CLIENT])
  @Patch(':id/address')
  async updateOrderAddress(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() adress: CreateAddressDto,
  ) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return this.orderService.updateOrderAddress(orderFound, adress);
  }
  @Auth([Roles.DELIVERY])
  @Patch(':id/delivery')
  async updateOrderDelivery(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() idDelivery: UpdateOrderDeliveryDto,
  ) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return this.orderService.updateOrderDelivery(orderFound, idDelivery);
  }

  @Auth([Roles.CLIENT, Roles.DELIVERY, Roles.LOCAL])
  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() status: UpdateOrderStatusDto,
  ) {
    const orderFound = await this.orderService.getOrderById(id);
    if (!orderFound) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    const orderUpdated = await this.orderService.updateOrderStatus(id, status);
    if (orderUpdated.status === status.status) {
      throw new HttpException('Status updated!', HttpStatus.CREATED);
    }
    this.sseService.derivateNotification(orderUpdated);
    //no devuelve nada
  }
  @Auth([Roles.CLIENT])
  @Patch(':id/eatable')
  async addEatableToOrder(
    @Param('id', new ParseUUIDPipe()) idOrder: string,
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
    console.log(orderEatableAdded);
    return orderEatableAdded;
  }

  @Auth([Roles.CLIENT])
  @Delete(':id/eatable')
  async deleteEatableToOrder(
    @Param('id', new ParseUUIDPipe()) idOrder: string,
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
