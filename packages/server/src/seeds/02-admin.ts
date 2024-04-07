// createAdmin.ts

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@modules/auth/utils';
import { AppConfigService } from 'src/config/service';

const prisma = new PrismaClient();

async function main() {
    const userRole = await prisma.role.findFirst({ where: { name: 'ADMIN' } });
    if (!userRole) {
        throw new Error('Admin role not found');
    }

    // const newAccount = await prisma.account.create({
    //     data: {
    //         username: 'admin',
    //         password: await hashPassword(AppConfigService.getAdminPassword()),
    //     },
    // });

    // const newUser = await prisma.user.create({
    //     data: {
    //         email: 'admin@ongdev.com',
    //         fullName: 'Ong Dev',
    //         accountId: newAccount.id,
    //         roles: { connect: { name: 'ADMIN' } },
    //     },
    // });

    // await prisma.admin.create({
    //     data: {
    //         userId: newUser.id,
    //     },
    // });

    console.log('Admin created successfully.');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
