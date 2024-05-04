// createAdmin.ts

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@modules/auth/utils';
import { vConfigService } from 'src/config/service';

const prisma = new PrismaClient();

async function main() {
    const userRole = await prisma.role.findFirst({ where: { name: 'ADMIN' } });
    if (!userRole) {
        throw new Error('Admin role not found');
    }
    
    const adminPassword = await vConfigService.getAdminPassword(); // Await the password retrieval
    const hashedPassword = await hashPassword(adminPassword); // Await the password hashing
    
    const newAccount = await prisma.account.create({
        data: {
            username: 'admin',
            password: hashedPassword, // Use the hashed password
        },
    });

    const newUser = await prisma.user.create({
        data: {
            email: 'admin@vdev.com',
            fullName: 'Ong Dev',
            accountId: newAccount.id,
            roles: { connect: { name: 'ADMIN' } },
        },
    });

    await prisma.admin.create({
        data: {
            userId: newUser.id,
        },
    });

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
