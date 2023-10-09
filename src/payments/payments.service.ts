import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payments.entity';
import { Repository } from 'typeorm';
import { UpdatePaymentDto } from './dto/updatePaymentDto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRespository: Repository<Payment>,
  ) {}

  createPayment() {
    const newPayment = this.paymentRespository.create();
    return this.paymentRespository.save(newPayment);
  }
  getPayments() {
    return this.paymentRespository.find();
  }

  getPaymentById(id: string) {
    return this.paymentRespository.findOne({
      where: { id },
    });
  }

  deletePayment(id: string) {
    return this.paymentRespository.delete(id);
  }
  updatePayment(id: string, order: UpdatePaymentDto) {
    return this.paymentRespository.update({ id }, order);
  }
}
