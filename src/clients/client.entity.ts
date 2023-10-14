import { Adress } from 'src/adress/adress.entity';
import { Order } from 'src/orders/orders.entity';
import { Review } from 'src/reviews/reviews.entity';

import {
  Entity,
  OneToMany,
  PrimaryColumn,
  Generated,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @OneToMany(() => Order, (order) => order.client)
  ordersHistory: Order[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviewsMade: Array<Review>;

  @OneToOne(() => Adress, { eager: true })
  @JoinColumn()
  adress: Adress;
}
