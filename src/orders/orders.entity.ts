import { Client } from 'src/clients/client.entity';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { Address } from 'src/address/address.entity';
import { Eatable } from 'src/eatables/eatables.entity';
import { Local } from 'src/locals/locals.entity';
import { Payment } from 'src/payments/payments.entity';

import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Status } from 'src/enums/status.enum';

@Entity()
export class Orders {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @ManyToMany(() => Eatable, { eager: true })
  @JoinTable()
  menuList: Eatable[];

  @Column({ default: 0 })
  totalPrice: number;

  @ManyToOne(() => Address, (address) => address.orders)
  address: Address;

  @ManyToOne(() => Client, (client) => client.ordersHistory)
  client: Client;

  @ManyToOne(() => Local, (local) => local.ordersHistory)
  local: Local;

  @ManyToOne(() => Delivery, (delivery) => delivery.ordersHistory)
  delivery: Delivery;

  @Column({ default: Status.waiting })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;
}
