import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ default: 'name' })
  name: string;

  @Column({ default: 'type' })
  type: string;

  @Column({ nullable: true })
  patent: string;
}
