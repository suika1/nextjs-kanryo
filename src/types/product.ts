import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { products } from '@/db/schema';

export type Product = InferSelectModel<typeof products>;
export type InsertProduct = InferInsertModel<typeof products>;
