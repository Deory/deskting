// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<User> {
    const user = this.usersService.findOne(name);
    if (!user) {
      throw new NotFoundException('Not Found the User');
    }
    return user;
  }
}
