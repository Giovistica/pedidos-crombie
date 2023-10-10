export class UpdatePaymentDto {
  type?: 'DEBIT' | 'CASH';
  status?: 'PAYED' | 'REJECTED' | 'ONWAIT ';
}
