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
        const find = await this.findByEmail(data.email);

        if (find) throw new ConflictException('Email already exists');

        return this.Prisma.user.create({ data });
    }

    async findAll(page: number, limit: number): Promise<Pagination<User>> {
        const total = await this.Prisma.user.count();
        const skip = (page - 1) * limit;
        const take = limit;

        const users = await this.Prisma.user.findMany({
            skip,
            take,
            orderBy: {
                id: 'asc',
            },
        });

        const lastPage = Math.ceil(total / limit);

        const data: Pagination<User> = {
            first: 1,
            last: lastPage,
            next: page < lastPage ? page + 1 : null,
            prev: page > 1 ? page - 1 : null,
            total,
            page,
            data: users
        }

        return data;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.Prisma.user.findUnique({
            where: { id }
        });

        if (user) throw new NotFoundException('User not found!');

        return user;
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
