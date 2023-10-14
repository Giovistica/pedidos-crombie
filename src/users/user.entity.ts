import { Client } from 'src/clients/client.entity';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Local } from 'src/locals/locals.entity';
import {
  Column,
  PrimaryColumn,
  Generated,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

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

  @Column()
  role: 'CLIENT' | 'DELIVERY' | 'LOCAL';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Client, { cascade: true })
  @JoinColumn()
  client: Client;

  @OneToOne(() => Delivery)
  @JoinColumn()
  delivery: Delivery;

  @OneToOne(() => Local, { eager: true })
  @JoinColumn()
  local: Local;
}
