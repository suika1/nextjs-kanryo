import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, products } from '@/app/lib/placeholder-data';
import { User } from '@/app/types/user';
import { Product } from '@/app/types/product';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user: User) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (
          id,
          name,
          email,
          password
        ) VALUES (
          ${user.id},
          ${user.name},
          ${user.email},
          ${hashedPassword}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title TEXT NOT NULL,
      pic  TEXT NOT NULL,
      description  TEXT NOT NULL,
      material  VARCHAR(255) NOT NULL,
      brand  VARCHAR(255) NOT NULL,
      size  TEXT NOT NULL,
      product_type  VARCHAR(255) NOT NULL,
      color  VARCHAR(255),
      weight  VARCHAR(255),
      price INT NOT NULL,
      rating INT NOT NULL,
      in_stock BOOLEAN
    );
  `;

  //  ${Array.isArray(product.size) ? `'{${product.size.map(size => `"${size}"`).join(', ')}}'` : product.size},
  const insertedProducts = await Promise.all(
    products.map(
      (product: Product) => sql`
        INSERT INTO products (
          id,
          title,
          pic,
          description,
          material,
          brand,
          size,
          product_type,
          color,
          weight,
          price,
          rating,
          in_stock
        ) VALUES (
          ${product.id},
          ${product.title},
          ${product.pic},
          ${product.description},
          ${product.material},
          ${product.brand},
          ${product.size},
          ${product.product_type},
          ${product.color || ''},
          ${product.weight || ''},
          ${product.price},
          ${product.rating * 10},
          ${product.inStock}
        )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

async function seedOrders() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      created_at DATE NOT NULL DEFAULT CURRENT_DATE,
      estimated_delivery_date DATE NOT NULL DEFAULT CURRENT_DATE,
      product_id UUID REFERENCES products(id),
      status VARCHAR(255) NOT NULL
    );
  `;

  return true;
}

async function seedSessions() {
  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      session_id VARCHAR(50) NOT NULL,
      user_id UUID REFERENCES users(id),
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    );
  `;

  return true;
}

export async function GET() {
  try {
    await sql.begin(() => [
      seedUsers(),
      seedProducts()
    ]);
    await seedOrders();
    await seedSessions();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
