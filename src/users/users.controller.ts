import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Response,
  Put,
  Query,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilterUserDto } from './dto/filter-user.dto';

@Controller('users')
@UseGuards(AuthGuard('basic'))
@UsePipes(new ValidationPipe({ transform: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Response() res, @Body() createUserDto: CreateUserDto) {
    try {
      const { error, data } = await this.usersService.create(createUserDto);
      if (error) {
        console.error(error);
        res.status(402).send({ error });
      }
      res.status(201).send({ data, message: 'User created successfully' });
    } catch (e) {
      return res.status(500).send('Contact support');
    }
  }

  @Get()
  async findAll(@Response() res, @Query() filterDto: FilterUserDto) {
    try {
      const { error, data } = await this.usersService.findAll(filterDto);
      if (error) {
        throw new BadRequestException(error);
      }
      return res.status(200).send(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Response() res, @Param('id') id: string) {
    const { error, data } = await this.usersService.findOne(+id);
    if (error) return res.status(400).send({ error });
    return res.status(200).send({ data });
  }

  @Put(':id')
  async update(
    @Response() res,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const { error, data } = await this.usersService.update(
        +id,
        updateUserDto,
      );
      if (error) return res.status(400).send({ error });
      return res
        .status(200)
        .send({ data: data.raw[0], message: 'Update successful' });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Delete(':id')
  async remove(@Response() res, @Param('id') id: string) {
    try {
      const { error, data } = await this.usersService.remove(+id);
      if (error) {
        if (error.message)
          return res.status(404).send({ error: error.message });

        return res.status(400).send({ error });
      }
      if (data) return res.status(200).send();
    } catch (e) {
      throw new BadGatewayException();
    }
  }
}
