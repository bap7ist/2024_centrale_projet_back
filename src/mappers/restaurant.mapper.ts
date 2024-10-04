// src/utils/restaurant.mapper.ts
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { Restaurant } from 'src/referentiels/restaurant/restaurant.entity';

export class RestaurantMapper {
  static mapRestaurantToDto(restaurant: Restaurant): RestaurantDto {
    return {
      id: restaurant.id,
      name: restaurant.name,
      adresse: restaurant.adresse,
      note:
        restaurant.avis.length > 0
          ? Math.round(
              restaurant.avis.reduce((acc, avis) => acc + avis.note, 0) /
                restaurant.avis.length,
            )
          : 0,
      avis: restaurant.avis.map((avis) => ({
        user: avis.user,
        date: avis.date,
        com: avis.com,
        note: avis.note,
      })),
    };
  }
}
