import { seedRoles } from './01-role';
import { seedAdmin } from './02-admin';
import { seedCategories } from './03-category';

async function main() {
  try {
    console.log('🌱 Start seeding...');

    await seedRoles();
    await seedCategories();
    await seedAdmin();

    console.log('🎉 Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();