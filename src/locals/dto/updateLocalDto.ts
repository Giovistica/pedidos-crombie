export class UpdateLocalDto {
  localName?: string;
  description?: string;
  type?:
    | 'RESTAURANT'
    | 'MARKET'
    | 'BAKERY'
    | 'PASTRYSHOP'
    | 'GELATERIA'
    | 'GROCERY'
    | 'DELICATESSEN';
}
