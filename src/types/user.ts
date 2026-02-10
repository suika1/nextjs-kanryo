import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { users } from '@/db/schema';

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
