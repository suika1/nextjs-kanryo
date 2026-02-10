import { db } from '@/db';
import { products as productsTable, users as usersTable } from '@/db/schema';
import { products, users } from '@/lib/placeholder-data';

export async function seedUsers() {
  try {
    console.log('Seeding users...');

    for (const user of users) {
      await db
        .insert(usersTable)
        .values({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .onConflictDoNothing();
    }

    console.log('Users seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

export async function seedProducts() {
  try {
    console.log('Seeding products...');

    for (const product of products) {
      await db
        .insert(productsTable)
        .values({
          title: product.title,
          pic: product.pic,
          description: product.description,
          material: product.material,
          brand: product.brand,
          size: product.size as string[],
          productType: product.productType,
          color: product.color || null,
          weight: product.weight || null,
          price: product.price,
          rating: product.rating,
          inStock: product.inStock,
        })
        .onConflictDoNothing();
    }

    console.log('Products seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

export async function seedAll() {
  try {
    console.log('Starting database seeding...');

    await seedUsers();
    await seedProducts();

    console.log('Database seeded successfully');
    return { message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
