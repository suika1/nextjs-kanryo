'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from '@/types/user';
import { v4 as uuid } from 'uuid';
import { createSession, deleteSession, getAllSessions, getSession } from '@/lib/actions/session';
import { createUser, getUserByEmail, getUserById } from '@/lib/actions/users';
import { loginSchema, registerSchema } from '@/types/session';
import dayjs from 'dayjs';

const SESSION_COOKIE = 'session_id';

export const authenticate = async (
  prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string, formState?: FormData } | undefined> => {
  try {
    const rawData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const validatedData = loginSchema.parse(rawData);

    const user = await getUserByEmail(validatedData.email);

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const isValidPassword = await bcrypt.compare(
      validatedData.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new Error('Неверный пароль');
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
      return { formState: formData, error: error?.issues?.[0]?.message || 'Прозошла ошибка при валидации' };
    }

    if (error instanceof Error) {
      return { formState: formData, error: error.message};
    }
      return { formState: formData, error: 'Прозошла ошибка при авторизации'};
  }

  redirect(formData.get('redirectUrl') as string || '/');
};

export const register = async (
  prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string, formState?: FormData } | undefined> => {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const validatedData = registerSchema.parse(rawData);

    const existingUser = await getUserByEmail(validatedData.email);
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const newUser: User = {
      id: uuid(),
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
      createdAt: null,
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { formState: formData, error: error?.issues?.[0]?.message || 'Прозошла ошибка при валидации' };
    }

    if (error instanceof Error) {
      return { formState: formData, error: error.message };
    }

    return { formState: formData, error: 'Произошла ошибка при регистрации' };
  }

  redirect(formData.get('redirectUrl') as string || '/');
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

  const user = await getUserById(sessionData?.userId);

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

setInterval(async () => {
  const now = dayjs();
  const sessions = await getAllSessions();
  for (const session of sessions) {
    if (now.diff(dayjs(session.createdAt), 'days') > 15) {
      await deleteSession(session.sessionId);
    }
  }
}, 1000 * 60 * 60 * 24);
