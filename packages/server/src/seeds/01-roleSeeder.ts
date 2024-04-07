// insertRoles.ts

import { DatabaseService } from '@modules/database/service';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { roles } from 'prisma/mock/data';

const prisma = new PrismaClient();

async function createRoles() {
    if (process.env.NODE_ENV === 'production') return;
    const prisma = new DatabaseService();
    const logger = new Logger();
    await prisma.role.createMany({
        data: roles,
    });

    console.log('Roles inserted successfully.');
}

createRoles()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
