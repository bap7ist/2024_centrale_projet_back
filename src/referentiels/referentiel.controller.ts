import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestaurantDto } from 'src/dto/restaurant.dto'; // Assurez-vous que les DTO sont importés correctement
import { ReferentielService } from './referentiel.service';
import { Restaurant } from './restaurant/restaurant.entity';
import { RestaurantMapper } from 'src/mappers/restaurant.mapper';

@Controller('referentiel')
export class ReferentielController {
  constructor(private referentielService: ReferentielService) {}

  @Get('restaurants')
  async getRestaurants(): Promise<RestaurantDto[]> {
    const restaurants: Restaurant[] =
      await this.referentielService.getRestaurants();
    return restaurants.map((restaurant) =>
      RestaurantMapper.mapRestaurantToDto(restaurant),
    );
  }

  @Post('restaurants')
  async addRestaurant(
    @Body() restaurantDto: RestaurantDto,
  ): Promise<RestaurantDto> {
    return this.referentielService.addRestaurant(restaurantDto);
  }

  @Post('restaurants/bulk')
  async addMultipleRestaurants(
    @Body() restaurantDtos: RestaurantDto[],
  ): Promise<RestaurantDto[]> {
    return this.referentielService.addMultipleRestaurants(restaurantDtos);
  }
}
