import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantDto } from 'src/dto/restaurant.dto'; // Assurez-vous d'importer vos DTO
import { Restaurant } from './restaurant/restaurant.entity';
import { RestaurantMapper } from 'src/mappers/restaurant.mapper';

@Injectable()
export class ReferentielService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async getRestaurants(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({ relations: ['avis'] }); // Assurez-vous de charger les relations
  }

  async addRestaurant(restaurantDto: RestaurantDto): Promise<RestaurantDto> {
    const restaurant = this.restaurantRepository.create(restaurantDto);
    const savedRestaurant = await this.restaurantRepository.save(restaurant);
    return RestaurantMapper.mapRestaurantToDto(savedRestaurant);
  }

  async addMultipleRestaurants(
    restaurantDtos: RestaurantDto[],
  ): Promise<RestaurantDto[]> {
    const restaurants = restaurantDtos.map((restaurantDto) =>
      this.restaurantRepository.create(restaurantDto),
    );
    const savedRestaurants = await this.restaurantRepository.save(restaurants);
    return savedRestaurants.map((restaurant) =>
      RestaurantMapper.mapRestaurantToDto(restaurant),
    );
  }
}
