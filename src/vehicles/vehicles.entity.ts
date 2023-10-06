import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  type: string;
  @Column()
  patent: string;
}
