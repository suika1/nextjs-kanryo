

import { products } from '@/db/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type Product = InferSelectModel<typeof products>
export type InsertProduct = InferInsertModel<typeof products>
