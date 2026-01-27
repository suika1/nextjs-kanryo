'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from '@/app/mocks/user';
import { users } from '@/app/lib/placeholder-data';
import { v4 as uuid } from 'uuid';

const loginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

const sessions = new Map<string, { userId: string, createdAt: number }>([
  ['32ez41u4jfe2', { userId: users[0].id, createdAt: 1769482028430 }],
]);


const SESSION_COOKIE = 'session_id';

const createSession = (userId: string): string => {
  const sessionId = Math.random().toString(36).substring(2);
  sessions.set(sessionId, { userId, createdAt: Date.now() });
  return sessionId;
};

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

    const sessionId = createSession(user.id);

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

  redirect('/')
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

    users.push(newUser);

    const sessionId = createSession(newUser.id);

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
    sessions.delete(sessionId);
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
  console.log('-------1-----');
  console.log(cookieStore.toString());
  console.log(sessionId);

  if (!sessionId) {
    return null;
  }

  const sessionData = sessions.get(sessionId);
  console.log(sessionData);
  console.log('------------');

  if (!sessionData) {
    return null;
  }

  const user = users.find((u) => u.id === sessionData?.userId);

  if (!user) {
    return null;
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// setInterval(() => {
//     const now = Date.now();
//     for (const [sid, session] of sessions.entries()) {
//         if (now - session.createdAt > 3600000) { // 1 час
//             sessions.delete(sid);
//         }
//     }
// }, 600000); // Проверка каждые 10 мин
