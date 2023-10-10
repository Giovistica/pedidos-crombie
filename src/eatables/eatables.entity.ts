import { Restaurant } from 'src/restaurants/restaurants.entity';
import { Entity, Column, PrimaryColumn, Generated, ManyToOne } from 'typeorm';
@Entity()
export class Eatable {
  @PrimaryColumn()
  @Generated('uuid')
  idEatable: string;

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

  @Column()
  menuType: 'SALTY' | 'SWEET' | 'BEBERAGE';

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'DELETED';

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    cascade: ['insert', 'update'],
  })
  restaurant: Restaurant;
}
