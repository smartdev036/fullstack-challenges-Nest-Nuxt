import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { Pagination } from 'src/app.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {

        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<Pagination<User>> {
        try {
            limit = limit ? +limit : 10;
            page = page ? +page : 1;
            return this.usersService.findAll(page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        try {
            return this.usersService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto): Promise<User> {
        try {
            return this.usersService.update(id, updateUserDto);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.usersService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
