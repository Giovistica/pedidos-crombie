export class CreateEatableDto {
  //Nombre más publicitario
  title: string;

  description: string;

  photo: string;

  price: number;

  menuType: 'SALTY' | 'SWEET' | 'BEBERAGE';

  name: string;
}
