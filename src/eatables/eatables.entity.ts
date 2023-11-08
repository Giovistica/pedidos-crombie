import { MenuType } from 'src/enums/menuType.enum';
import { Local } from 'src/locals/locals.entity';
import { Entity, Column, PrimaryColumn, Generated, ManyToOne } from 'typeorm';
@Entity()
export class Eatable {
  @PrimaryColumn()
  @Generated('uuid')
  idEatable: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    length: 1000,
    default:
      'https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Recetas-faciles-de-cocinar-y-sobrevivir-en-casa-al-coronavirus_2.jpg',
  })
  photo: string;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: MenuType, default: MenuType.salty })
  menuType: MenuType;

  @ManyToOne(() => Local, (local) => local.menus, {
    cascade: ['insert', 'update'],
  })
  local: Local;
}
