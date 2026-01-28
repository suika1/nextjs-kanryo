'use server';

import { User } from '@/app/types/user';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export const createUser = async (user: User) => {
  const isCreated = await sql`
    INSERT INTO users (
      id,
      name,
      email,
      password
    ) VALUES (
      ${user.id},
      ${user.name},
      ${user.email},
      ${user.password}
    )
  `;
  if (!isCreated) {
    throw Error('User was not created');
  }
  return true;
};

export const getUserById = async (id: string) => {
  const users = await sql<User[]>`SELECT * FROM users WHERE id = ${id}`;
  if (!users?.length) {
    return null;
  }
  return users[0];
};
export const getUserByEmail = async (email: string) => {
  const users = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
  if (!users?.length) {
    return null;
  }
  return users[0];
};
