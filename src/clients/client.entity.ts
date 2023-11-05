import { Address } from 'src/address/address.entity';
import { Orders } from 'src/orders/orders.entity';
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

  @OneToMany(() => Orders, (order) => order.client, { eager: true })
  ordersHistory: Orders[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviewsMade: Array<Review>;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;
}
