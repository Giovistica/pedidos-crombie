import { Client } from 'src/clients/clients.entity';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { Direccion } from 'src/direccion/direccion.entity';
import { Restaurant } from 'src/restaurants/restaurants.entity';
import { Review } from 'src/rewies/reviews.entity';
import {
  Column,
  PrimaryColumn,
  Generated,
  OneToOne,
  JoinColumn,
  OneToMany,
  Entity,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => Direccion)
  @JoinColumn()
  adress: Direccion;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Review, (review) => review.reviewed)
  reviewsHistory: Array<Review>;

  @Column()
  role: 'CLIENT' | 'DELIVERY' | 'RESTAURANT';

  //no andan la herencia ni nada
  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @OneToOne(() => Delivery)
  @JoinColumn()
  delivery: Delivery;

  @OneToOne(() => Restaurant)
  @JoinColumn()
  retaurant: Restaurant;
}
