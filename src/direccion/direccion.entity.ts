import { Order } from 'src/orders/orders.entity';
import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Direccion {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;
  @Column()
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
  @Column()
  apartment: string;
  @OneToMany(() => Order, (order) => order.adress)
  orders: Array<Order>;
}
