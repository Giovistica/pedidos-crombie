import { LocalType } from 'src/enums/local.enum';

export class UpdateLocalDto {
  localName?: string;
  description?: string;
  type?: LocalType;
}
