import { DatabaseService } from '../modules/database/service';
import { Logger } from '@nestjs/common';

const categories = [
  { name: 'Web Development' },
  { name: 'Mobile Development' },
  { name: 'Data Science' },
  { name: 'DevOps' },
  { name: 'UI/UX Design' },
];

export async function seedCategories() {
  const prisma = new DatabaseService();
  const logger = new Logger();

  try {
    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });

    console.log('✅ Categories inserted');
  } catch (error) {
    logger.error('❌ Category error: ', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
