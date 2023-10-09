import { Order } from 'src/orders/orders.entity';
import { Review } from 'src/reviews/reviews.entity';

import { Entity, Column, OneToMany, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class Client {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @OneToMany(() => Order, (order) => order.client)
  ordersHistory: Array<Order>[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviewsMade: Array<Review>;

  @Column({ nullable: true })
  datosTarjeta: string;
}
