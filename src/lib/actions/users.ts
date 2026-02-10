'use server';

import { User } from '@/types/user';
import { db } from '@/db';
import { users as usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const createUser = async (user: User) => {
  const result = await db.insert(usersTable).values({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  if (!result) {
    throw new Error('User was not created');
  }
  return true;
};

export const getUserById = async (id: string) => {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

  if (!users?.length) {
    return null;
  }
  return users[0] as User;
};

export const getUserByEmail = async (email: string) => {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (!users?.length) {
    return null;
  }
  return users[0] as User;
};
