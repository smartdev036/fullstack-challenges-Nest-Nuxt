import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, Query, ConflictException, NotFoundException, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { Pagination } from 'src/app.interface';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiOperation({ summary: 'Create new users' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        schema: {
            example: {
                id: '3fbb240d-0642-4b26-b9d6-85372ab5a35c',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                position: 'Developer',
                phone: "(111) 111-1111",
                deleted: false,
                createdAt: "2024-09-03T13:58:10.674Z",
                updatedAt: "2024-09-03T13:58:10.674Z"
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        schema: {
            example: {
                "message": [
                    "firstName must be longer than or equal to 1 characters",
                    "lastName must be longer than or equal to 1 characters",
                    "position must be longer than or equal to 1 characters",
                    "email must be longer than or equal to 1 characters",
                    "email must be an email",
                    "phone must be longer than or equal to 1 characters"
                ],
                "error": "Bad Request",
                "statusCode": 400
            }
        }
    })
    @ApiResponse({
        status: 409,
        description: 'Conflict',
        schema: {
            example: {
                statusCode: 409,
                message: 'Email address is not unique',
                error: 'Conflict'
            }
        }
    })
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

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        schema: {
            example: {
                first: 1,
                last: 10,
                next: 2,
                prev: null,
                total: 50,
                total_page: 5,
                page: 1,
                data: [
                    {
                        id: '3fbb240d-0642-4b26-b9d6-85372ab5a35c',
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john@example.com',
                        position: 'Developer',
                        phone: "(111) 111-1111",
                        deleted: false,
                        createdAt: "2024-09-03T13:58:10.674Z",
                        updatedAt: "2024-09-03T13:58:10.674Z"
                    },
                ]
            }
        }
    })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiQuery({ name: 'sortby', required: false, enum: ['firstName', 'lastName', 'position'], description: 'Sort by field' })
    @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
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

    @ApiOperation({ summary: 'Get single user by id' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        schema: {
            example: {
                id: '3fbb240d-0642-4b26-b9d6-85372ab5a35c',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                position: 'Developer',
                phone: "(111) 111-1111",
                deleted: false,
                createdAt: "2024-09-03T13:58:10.674Z",
                updatedAt: "2024-09-03T13:58:10.674Z"
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        schema: {
            example: {
                "message": "User not found!",
                "error": "Not Found",
                "statusCode": 404
            }
        }
    })
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

    @ApiOperation({ summary: 'Update single user by id' })
    @ApiResponse({
        status: 200,
        description: 'Success',
        schema: {
            example: {
                id: '3fbb240d-0642-4b26-b9d6-85372ab5a35c',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                position: 'Developer',
                phone: "(111) 111-1111",
                deleted: false,
                createdAt: "2024-09-03T13:58:10.674Z",
                updatedAt: "2024-09-03T13:58:10.674Z"
            }
        }
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        schema: {
            example: {
                "message": [
                    "firstName must be longer than or equal to 1 characters"
                ],
                "error": "Bad Request",
                "statusCode": 400
            }
        }
    })
    @ApiResponse({
        status: 409,
        description: 'Conflict',
        schema: {
            example: {
                statusCode: 409,
                message: 'Email address is not unique',
                error: 'Conflict'
            }
        }
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        schema: {
            example: {
                "message": "User not found!",
                "error": "Not Found",
                "statusCode": 404
            }
        }
    })
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

    @ApiOperation({ summary: 'Delete single user by id' })
    @ApiResponse({ status: 204, description: 'Success' })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        schema: {
            example: {
                "message": "User not found!",
                "error": "Not Found",
                "statusCode": 404
            }
        }
    })
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
