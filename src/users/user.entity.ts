import { Client } from 'src/clients/client.entity';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { Direccion } from 'src/direccion/direccion.entity';
import { Restaurant } from 'src/restaurants/restaurants.entity';
import { Review } from 'src/reviews/reviews.entity';
import {
  Column,
  PrimaryColumn,
  Generated,
  OneToOne,
  JoinColumn,
  OneToMany,
  Entity,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  userId: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  @IsPhoneNumber()
  phoneNumber: string;

  @OneToOne(() => Direccion, { eager: true })
  @JoinColumn()
  adress: Direccion;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Review, (review) => review.reviewed, { eager: true })
  reviewsHistory: Array<Review>;

  @Column()
  averagePunctuation: number;

  @Column()
  role: 'CLIENT' | 'DELIVERY' | 'RESTAURANT';

  @OneToOne(() => Client, { cascade: true })
  @JoinColumn()
  client: Client;

  @OneToOne(() => Delivery)
  @JoinColumn()
  delivery: Delivery;

  @OneToOne(() => Restaurant, { eager: true })
  @JoinColumn()
  restaurant: Restaurant;
}
