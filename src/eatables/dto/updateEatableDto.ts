import { MenuType } from 'src/enums/menuType.enum';

export class UpdateEatableDto {
  title?: string;

  description?: string;

  photo?: string;

  price?: number;

  menuType?: MenuType;

  name?: string;
}
