import { Client } from 'src/clients/client.entity';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { Direccion } from 'src/direccion/direccion.entity';
import { Eatable } from 'src/eatables/eatables.entity';
import { Payment } from 'src/payments/payments.entity';
import { Restaurant } from 'src/restaurants/restaurants.entity';

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

@Entity()
export class Order {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @ManyToMany(() => Eatable, { eager: true })
  @JoinTable()
  menuList: Eatable[];

  @Column({ default: 0 })
  totalPrice: number;

  @ManyToOne(() => Direccion, (direccion) => direccion.orders)
  adress: Direccion;

  @ManyToOne(() => Client, (client) => client.ordersHistory, {
    cascade: ['insert', 'update'],
  })
  client: Client;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.ordersHistory)
  restaurant: Restaurant;

  @ManyToOne(() => Delivery, (delivery) => delivery.ordersHistory)
  delivery: Delivery;

  @Column({ default: 'WAITING' })
  status: 'WAITING' | 'ONPREP' | 'PREP' | 'ONITSWAY' | 'RECEIVED' | 'CANCELLED';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;
}
