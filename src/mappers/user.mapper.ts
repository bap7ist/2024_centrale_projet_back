import { UserDto } from 'src/dto/user.dto';
import { RestaurantMapper } from './restaurant.mapper';
import { User } from 'src/user/user.entity';

export class UserMapper {
  static mapToUserDto(user: User): UserDto {
    const userDto: UserDto = {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email: user.email ?? '',
      profilePicture: user.profilePicture ?? '',
      favoriteRestaurants: [],
    };

    if (user.favoriteRestaurants) {
      user.favoriteRestaurants.forEach((restaurant) => {
        userDto.favoriteRestaurants.push(
          RestaurantMapper.mapRestaurantToDto(restaurant),
        );
      });
    }
    return userDto;
  }
}
