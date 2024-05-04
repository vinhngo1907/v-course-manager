import { AppConfigService } from 'src/config/service';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@modules/database/service';
import { Logger } from '@nestjs/common';
import { hashPassword } from '@modules/auth/utils';


async function main() {
    const appConfigService = new AppConfigService(new ConfigService()); // Await the password retrieval
    const prisma = new DatabaseService();
    const logger = new Logger();
    try {
        const userRole = await prisma.role.findFirst({ where: { name: 'ADMIN' } });
        console.log(userRole)
        if (!userRole) {
            throw new Error('Admin role not found');
        }

        const adminPassword = appConfigService.getAdminPassword();
        const hashedPassword = await hashPassword(adminPassword); // Await the password hashing

        // const newAccount = await prisma.account.create({
        //     data: {
        //         username: 'admin',
        //         password: hashedPassword, // Use the hashed password
        //     },
        // });

        // const newUser = await prisma.user.create({
        //     data: {
        //         email: 'admin@vdev.com',
        //         fullName: 'V Dev',
        //         accountId: newAccount.id,
        //         roles:userRole,
        //     },
        // });

        // await prisma.admin.create({
        //     data: {
        //         userId: newUser.id,
        //     },
        // });

        console.log('Admin created successfully.');
    } catch (error) {
        logger.error("Error: ", error);
        process.exit(1);
    } finally {
        prisma.$disconnect()
    }
}

main()

