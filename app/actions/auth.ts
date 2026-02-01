'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from '@/app/types/user';
import { users } from '@/app/lib/placeholder-data';
import { v4 as uuid } from 'uuid';
import { createSession, deleteSession, getSession } from '@/app/lib/actions/session';
import { createUser, getUserById } from '@/app/lib/actions/users';
import { loginSchema, registerSchema } from '@/app/types/session';

const SESSION_COOKIE = 'session_id';

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
  // vvv TODO: state: { fields: {....}, errMsg: '...' }
): Promise<string | undefined> => {
  try {
    const rawData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const validatedData = loginSchema.parse(rawData);

    const user = users.find((u) => u.email === validatedData.email);

    if (!user) {
      return 'Пользователь не найден';
    }

    const isValidPassword = await bcrypt.compare(
      validatedData.password,
      user.password,
    );

    if (!isValidPassword) {
      return 'Неверный пароль';
    }

    const sessionId = await createSession(user.id);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('error');
      console.log(error);
      return 'err';
      // return { error: error.errors[0].message };
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Произошла ошибка при авторизации';
  }

  redirect(formData.get('redirectUrl') as string || '/');
};

export const register = async (
  prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string; success?: boolean } | undefined> => {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const validatedData = registerSchema.parse(rawData);

    const existingUser = users.find((u) => u.email === validatedData.email);
    if (existingUser) {
      return { error: 'Пользователь с таким email уже существует' };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const newUser: User = {
      id: uuid(),
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
    };

    await createUser(newUser);
    const sessionId = await createSession(newUser.id);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });

    redirect('/');
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('error');
      console.log(error);
      return { error: 'err' };
      // return { error: error.errors[0].message };
    }

    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: 'Произошла ошибка при регистрации' };
  }
};

export const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionId) {
    deleteSession(sessionId);
  }

  cookieStore.delete(SESSION_COOKIE);
  redirect('/login');
};

export const getCurrentUser = async (): Promise<Omit<
  User,
  'password'
> | null> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    return null;
  }

  const sessionData = await getSession(sessionId);

  if (!sessionData) {
    return null;
  }

  const user = await getUserById(sessionData?.user_id);

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// setInterval(async () => {
//     const now = Date.now();
//     const sessions = await getAllSessions();
//     for (const session of sessions) {
//         if (now - session.createdAt > 1000 * 60 * 60) {
//             deleteSession(session.sessionId);
//         }
//     }
// }, 1000 * 60 * 10);
