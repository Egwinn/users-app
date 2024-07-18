import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/data/postgres/dto/create-user.dto';
import {
    FindAllUsersOptionsDto,
    FindAllUsersResponseDto,
} from 'src/data/postgres/dto/find-all-users.dto';
import { UpdateUserDto } from 'src/data/postgres/dto/update-user.dto';
import { User } from 'src/data/postgres/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(@Query() query: FindAllUsersOptionsDto): Promise<FindAllUsersResponseDto> {
        const [users, totalCount] = await this.usersService.findAll(query);
        return {
            items: users,
            skip: query.skip,
            limit: query.limit,
            total: totalCount,
        };
    }

    @Get('/:id')
    async findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(+id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Patch('/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.usersService.delete(+id);
    }
}
