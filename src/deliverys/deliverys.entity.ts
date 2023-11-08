import { Orders } from 'src/orders/orders.entity';
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';
import { Vehicle } from 'src/vehicles/vehicles.entity';
import {
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

  @OneToMany(() => Orders, (order) => order.delivery, { eager: true })
  ordersHistory: Array<Orders>[];

  @OneToOne(() => ProfileReviews, { eager: true })
  @JoinColumn()
  profileReviews: ProfileReviews;

  @OneToOne(() => Vehicle, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  vehicle: Vehicle;
}
