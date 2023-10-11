import { Order } from 'src/orders/orders.entity';
import { Vehicle } from 'src/vehicles/vehicles.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @OneToMany(() => Order, (order) => order.delivery)
  ordersHistory: Array<Order>[];

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;

  @Column({ nullable: true })
  acount: string;
}
