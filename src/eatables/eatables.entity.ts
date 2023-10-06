import { Order } from 'src/orders/orders.entity';
import { Restaurant } from 'src/restaurants/restaurants.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  Generated,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
@Entity()
export class Eatable {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    default:
      'https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Recetas-faciles-de-cocinar-y-sobrevivir-en-casa-al-coronavirus_2.jpg',
  })
  photo: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @ManyToMany(() => Order, (order) => order.yummy)
  orders: Array<Order>;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
  restaurant: Restaurant;
  @Column()
  menuType: 'SALTY' | 'SWEET' | 'BEBERAGE';
}
