import { Client } from 'src/clients/client.entity';
import { Delivery } from 'src/deliverys/deliverys.entity';
import { Local } from 'src/locals/locals.entity';
import {
  Column,
  PrimaryColumn,
  Generated,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Roles } from 'src/enums/role.enum';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  userId: string;

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

  @Column({ type: 'enum', enum: Roles, default: Roles.CLIENT })
  role: Roles;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Client, { eager: true, cascade: true })
  @JoinColumn()
  client: Client;

  @OneToOne(() => Delivery, { eager: true, cascade: true })
  @JoinColumn()
  delivery: Delivery;

  @OneToOne(() => Local, { eager: true, cascade: true })
  @JoinColumn()
  local: Local;
}
