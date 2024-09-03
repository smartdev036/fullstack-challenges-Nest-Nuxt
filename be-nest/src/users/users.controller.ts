import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, Query, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { Pagination } from 'src/app.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {
        try {
            const find = await this.usersService.findByEmail(createUserDto.email.toLowerCase());

            if (find) throw new ConflictException('Email address is not unique');

            return this.usersService.create(createUserDto);
        } catch (error) {
            throw error;
        }
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('sortby', new DefaultValuePipe('firstName')) sortBy: 'firstName' | 'lastName' | 'position',
        @Query('order', new DefaultValuePipe('asc')) order: 'asc' | 'desc'
    ): Promise<Pagination<User>> {
        try {
            return this.usersService.findAll(page, limit, sortBy, order);
        } catch (error) {
            throw error;
        }
    }
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        try {
            const user = await this.usersService.findOne(id);

            if (!user) throw new NotFoundException('User not found!');

            return user;
        } catch (error) {
            throw error;
        }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.usersService.findOne(id);

            if (!user) throw new NotFoundException('User not found!');

            if (updateUserDto.email && user.email !== updateUserDto.email) {
                updateUserDto.email = updateUserDto.email.toLowerCase();
                if (user.email !== updateUserDto.email) {
                    const find = await this.usersService.findByEmail(updateUserDto.email);

                    if (find) throw new ConflictException('Email address is not unique');
                }
            }

            return this.usersService.update(id, updateUserDto);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        try {
            const user = await this.usersService.findOne(id);

            if (!user) throw new NotFoundException('User not found!');

            return this.usersService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
