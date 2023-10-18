import { Order } from 'src/orders/orders.entity';
import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryColumn()
  @Generated('uuid')
  idAddress: string;

  @Column({ default: 'ARGENTINA' })
  country: string;

  @Column()
  state: string;

  @Column()
  CP: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ default: '-' })
  apartment: string;

  @OneToMany(() => Order, (order) => order.address)
  orders: Array<Order>;
}
