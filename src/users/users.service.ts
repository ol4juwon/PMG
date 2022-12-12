import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * create - Add new User
   * @params {createUserDto} - user payload
   * @returns - error Object | data object
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.save(createUserDto);
      if (user) return { data: user };
      return { error: 'Error creating User' };
    } catch (e) {
      console.log(e);
      return { error: e.message };
    }
  }
  /**
   * Find all users
   * @param { sort_field, sort_order_mode,
   * filter_field, filter_value,
   * page,page_size} - fields to sort or filter by
   * @returns - error or data
   */
  async findAll(query: FilterUserDto) {
    // deconstruct queries
    const {
      sort_field,
      sort_order_mode,
      filter_field,
      filter_value,
      page,
      page_size,
    } = query;
    const searchQuery: {
      skip: number;
      take: number;
      where?: { [x: string]: FindOperator<string> };
      order: any;
      // cache: boolean;
    } = {
      skip: 0,
      take: 25,
      order: { id: 'ASC' },
      // cache: true,
    };
    const skip = page ? page - 1 : 0;
    searchQuery.skip = skip;
    const take = page_size || 25;
    searchQuery.take = take;
    if (filter_field) {
      searchQuery.where = { [filter_field]: ILike(`%${filter_value || ''}%`) };
    }
    const sort = [
      `${sort_field || 'id'}`,
      sort_order_mode ? '' + sort_order_mode + '' : 'ASC',
    ];
    searchQuery.order = { [sort[0]]: sort[1] };
    console.log(searchQuery);
    try {
      const result = await this.userRepository.find(searchQuery);
      if (result.length == 0) {
        return { data: { data: result, message: 'Users not found' } };
      }
      return { data: { data: result, message: 'Users found' } };
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  /**
   * Find one user
   * @param id - datatype number
   * @returns data object containing user |
   * error object containing error message
   * or user not found message
   */
  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (user) return { data: user };

      return { error: 'no user found' };
    } catch (error) {
      return { error: error.details };
    }
  }
  /**
   * Update user
   * @param id - datatype number
   * @param updateUserDto
   * @returns Error | Data object
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userRepository
        .createQueryBuilder()
        .update(updateUserDto)
        .where({ id: id })
        .returning('*')
        .execute();
      console.log(result);
      if (result.affected == 0) {
        return { error: 'user not found' };
      }
      return { data: result };
    } catch (error) {
      return { error: error.message };
    }
  }
  /**
   * Delete User
   * @param id - datatype number
   * @returns
   */
  async remove(id: number) {
    try {
      const deletedUser = await this.userRepository.delete(id);
      if (deletedUser.affected == 1) return { data: deletedUser };
      return { error: { message: 'User not found' } };
    } catch (e) {
      return { error: e.message };
    }
  }
}
