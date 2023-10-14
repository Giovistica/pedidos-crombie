import { Roles } from 'src/enums/role.enum';

export class UserCreatedDto {
  email: string;

  name: string;

  lastName: string;

  phoneNumber: string;

  role: Roles;

  createdAt: Date;

  clientID?: string;

  deliveryID?: string;

  localID?: string;

  profileReviewsID?: string;
}
