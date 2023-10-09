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
import { PaymentsService } from './payments.service';
import { UpdatePaymentDto } from './dto/updatePaymentDto';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}
  @Post()
  createPayment() {
    return this.paymentService.createPayment();
  }
  @Get()
  getAllPayments() {
    return this.paymentService.getPayments();
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    const paymentFound = await this.paymentService.getPaymentById(id);
    if (!paymentFound) {
      throw new HttpException('Payment does not exist', HttpStatus.NOT_FOUND);
    }
    return paymentFound;
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string) {
    const result = await this.paymentService.deletePayment(id);

    if (result.affected === 0) {
      throw new HttpException('Order does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() order: UpdatePaymentDto,
  ) {
    const orderFound = await this.paymentService.getPaymentById(id);

    if (!orderFound) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }
    return this.paymentService.updatePayment(id, order);
  }
}
