import { orders } from '@/db/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export enum OrderStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}

export type Order = InferSelectModel<typeof orders>;
export type InsertOrder = InferInsertModel<typeof orders>;
