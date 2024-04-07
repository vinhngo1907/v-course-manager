// insertRoles.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const roles = [
        { name: 'ADMIN' },
        { name: 'USER' },
        { name: 'SUPPORTER' },
        { name: 'MOD' },
    ];

    await prisma.role.createMany({
        data: roles,
    });

    console.log('Roles inserted successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
