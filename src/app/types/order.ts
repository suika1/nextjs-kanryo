import { Product } from '@/src/app/types/product';

export enum OrderStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}

export interface Order {
  id: string;
  user_id: string;
  created_at: string;
  estimated_delivery_date: string;
  products: Product['id'][];
  status: OrderStatus;
}
