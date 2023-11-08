import { Address } from 'src/address/address.entity';
import { Eatable } from 'src/eatables/eatables.entity';
import { LocalType } from 'src/enums/local.enum';
import { Orders } from 'src/orders/orders.entity';
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

  @Column({ type: 'enum', enum: LocalType, default: LocalType.grocery })
  type: LocalType;

  @OneToMany(() => Orders, (order) => order.local, { eager: true })
  ordersHistory: Array<Orders>[];

  @OneToOne(() => ProfileReviews, { eager: true })
  @JoinColumn()
  profileReviews: ProfileReviews;

  @OneToMany(() => Eatable, (eatable) => eatable.local, { eager: true })
  menus: Eatable[];

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;
}
