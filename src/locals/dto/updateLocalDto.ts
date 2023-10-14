export class UpdateLocalDto {
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
