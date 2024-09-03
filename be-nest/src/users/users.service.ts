import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { Pagination } from 'src/app.interface';

@Injectable()
export class UsersService {
    constructor(
        private Prisma: PrismaService
    ) { }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.Prisma.user.create({ data });
    }

    async findAll(page: number, limit: number, sortBy: 'firstName' | 'lastName' | 'position' = 'firstName', order: 'asc' | 'desc' = 'asc'): Promise<Pagination<User>> {
        const total = await this.Prisma.user.count();
        const skip = (page - 1) * limit;
        const take = limit;

        const users = await this.Prisma.user.findMany({
            skip,
            take,
            orderBy: {
                [sortBy]: order,
            },
        });

        const total_page = Math.ceil(total / limit);

        const data: Pagination<User> = {
            first: (page - 1) * limit + 1,
            last: (page - 1) * limit + limit,
            next: page < total_page ? page + 1 : null,
            prev: page > 1 ? page - 1 : null,
            total,
            total_page,
            page,
            data: users
        }

        return data;
    }

    findOne(id: string): Promise<User> {
        return this.Prisma.user.findUnique({
            where: { id, deleted: false }
        });
    }

    findByEmail(email: string): Promise<User> {
        return this.Prisma.user.findUnique({
            where: { email }
        });
    }

    update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.Prisma.user.update({
            where: { id },
            data: data
        });
    }

    async remove(id: string): Promise<void> {
        await this.Prisma.user.update({
            where: { id },
            data: { deleted: true }
        });
        return;
    }
}
