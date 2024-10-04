import { RestaurantDto } from './restaurant.dto';

export class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  favoriteRestaurants: RestaurantDto[];
}

export class UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  favoriteRestaurantsId: number[];
}

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
}
