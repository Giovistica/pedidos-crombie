import { Max, Min } from 'class-validator';
import { Client } from 'src/clients/client.entity';
import { Orders } from 'src/orders/orders.entity';
import { ProfileReviews } from 'src/profileReviews/profileReviews.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @Max(5)
  @Min(0)
  punctuation: number;

  @OneToOne(() => Orders, { eager: true })
  order: Orders;

  @ManyToOne(() => Client, (client) => client.reviewsMade)
  reviewer: Client;

  @ManyToOne(() => ProfileReviews, (profile) => profile.reviewsHistory)
  reviewed: ProfileReviews;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
