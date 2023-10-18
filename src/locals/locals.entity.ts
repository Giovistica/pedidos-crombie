import { Address } from 'src/address/address.entity';
import { Eatable } from 'src/eatables/eatables.entity';
import { Order } from 'src/orders/orders.entity';
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';

import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Local {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ nullable: true })
  localName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'RESTAURANT' })
  type:
    | 'RESTAURANT'
    | 'MARKET'
    | 'BAKERY'
    | 'PASTRYSHOP'
    | 'GELATERIA'
    | 'GROCERY'
    | 'DELICATESSEN';

  @OneToMany(() => Order, (order) => order.local)
  ordersHistory: Array<Order>[];

  @OneToOne(() => ProfileReviews)
  @JoinColumn()
  profileReviews: ProfileReviews;

  @OneToMany(() => Eatable, (eatable) => eatable.local, { eager: true })
  menus: Eatable[];

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;
}
