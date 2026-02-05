'use server';

import { Session } from '@/src/app/types/session';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export const createSession = async (userId: string): Promise<Session['session_id']> => {
  const sessionId = Math.random().toString(36).substring(2);
  const isCreated = await sql`
    INSERT INTO sessions (session_id, user_id)
    VALUES (${sessionId}, ${userId})
  `;

  if (!isCreated) {
    throw new Error('Session was not created');
  }
  return sessionId;
};

export const getSession = async (sessionId: string) => {
  const session = await sql<Session[]>`SELECT * FROM sessions WHERE session_id = ${sessionId}`;
  if (!session?.length) {
    return null;
  }
  return session[0];
};

export const getAllSessions = async () => {
  const sessions = await sql<Session[]>`SELECT * FROM sessions`;
  return sessions;
};

export const deleteSession = async (sessionId: string) => {
  await sql`DELETE FROM sessions WHERE session_id = ${sessionId}`;
};
