'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { sessions as sessionsTable } from '@/db/schema';
import type { Session } from '@/types/session';

export const createSession = async (userId: string): Promise<Session['sessionId']> => {
  const sessionId = Math.random().toString(36).substring(2);

  const result = await db.insert(sessionsTable).values({
    sessionId,
    userId,
  });

  if (!result) {
    throw new Error('Session was not created');
  }
  return sessionId;
};

export const getSession = async (sessionId: string) => {
  const session = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.sessionId, sessionId))
    .limit(1);

  if (!session?.length) {
    return null;
  }
  return session[0];
};

export const getAllSessions = async () => {
  const sessions = await db.select().from(sessionsTable);
  return sessions as Session[];
};

export const deleteSession = async (sessionId: string) => {
  await db.delete(sessionsTable).where(eq(sessionsTable.sessionId, sessionId));
};
