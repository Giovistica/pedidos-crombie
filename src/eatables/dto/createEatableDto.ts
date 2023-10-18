import { MenuType } from 'src/enums/menuType.enum';

export class CreateEatableDto {
  //Nombre más publicitario
  title: string;

  description: string;

  photo: string;

  price: number;

  menuType: MenuType;

  name: string;
}
