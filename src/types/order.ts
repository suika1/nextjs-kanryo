import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { orders } from '@/db/schema';

export enum OrderStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}

export type Order = InferSelectModel<typeof orders>;
export type InsertOrder = InferInsertModel<typeof orders>;
