import { Max, Min } from 'class-validator';
import { Client } from 'src/clients/client.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';

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

  @ManyToOne(() => Client, (client) => client.reviewsMade)
  reviewer: Client;

  @ManyToOne(() => User, (user) => user.reviewsHistory)
  reviewed: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
