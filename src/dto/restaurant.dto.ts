export class RestaurantDto {
  id: number;
  name: string;
  adresse: string;
  note: number;
  avis: AvisDto[];
}

export class AvisDto {
  user: string;
  date: Date;
  com: string;
  note: number;
}
