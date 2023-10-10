import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ default: 'ONWAIT' })
  status: 'PAYED' | 'REJECTED' | 'ONWAIT ';

  @Column({ default: 'CASH' })
  type: 'DEBIT' | 'CASH';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
