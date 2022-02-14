// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';
// eslint-disable-next-line prettier/prettier
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User', description: '사용자를 생성한다.' })
  @ApiBody({ type: User })
  @ApiResponse({ status: 201, description: 'User Created', type: User })
  @ApiResponse({ status: 400, description: 'Wrong Body Format' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve User', description: '비밀번호 제외.' })
  @ApiParam({ name: 'name', description: 'the name of user' })
  @ApiResponse({ status: 200, description: 'Found User', type: User })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  @Get(':name')
  async findOne(@Param('name') name: string): Promise<User> {
    return this.usersService.findOne(name);
  }
}
