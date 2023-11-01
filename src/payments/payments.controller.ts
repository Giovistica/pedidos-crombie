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
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { UpdatePaymentDto } from './dto/updatePaymentDto';
import { Roles } from 'src/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Auth([Roles.ADMIN])
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
  async getPayment(@Param('id', new ParseUUIDPipe()) id: string) {
    const paymentFound = await this.paymentService.getPaymentById(id);
    if (!paymentFound) {
      throw new HttpException('Payment does not exist', HttpStatus.NOT_FOUND);
    }
    return paymentFound;
  }

  @Delete(':id')
  async deletePayment(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.paymentService.deletePayment(id);

    if (result.affected === 0) {
      throw new HttpException('Payment does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  async updatePayment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payment: UpdatePaymentDto,
  ) {
    const paymentFound = await this.paymentService.getPaymentById(id);

    if (!paymentFound) {
      throw new HttpException('Payment does not exist', HttpStatus.NOT_FOUND);
    }
    return this.paymentService.updatePayment(id, payment);
  }
}
