import { Eatable } from 'src/eatables/eatables.entity';
import { Order } from 'src/orders/orders.entity';

import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @OneToMany(() => Order, (order) => order.restaurant)
  ordersHistory: Array<Order>[];

  @OneToMany(() => Eatable, (eatable) => eatable.restaurant)
  menu: Array<Eatable>;

  @Column()
  acount: string;

  @Column()
  punctuation: number;
}
