import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function phoneNumber() {
    const areaCode = faker.string.numeric(3);
    const exchangeCode = faker.string.numeric(3);
    const subscriberNumber = faker.string.numeric(4);

    return `(${areaCode}) ${exchangeCode}-${subscriberNumber}`;
}

async function main() {
    console.log('\nSeed Start: User');

    for (let n = 0; n < 100; n++) {
        process.stdout.write('.');
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName() + n;
        const user: Prisma.UserCreateInput = {
            firstName,
            lastName,
            email: faker.internet.email({ firstName, lastName }),
            phone: phoneNumber()
        }

        await prisma.user.create({ data: user });
    }
    console.log('\nSeed Finish: User');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });