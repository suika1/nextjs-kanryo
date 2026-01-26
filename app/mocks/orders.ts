import { Product } from '@/app/mocks/products';

export enum OrderStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}

export interface Order {
  id: number;
  createdAt: string;
  estimatedDeliveryDate: string;
  products: Product['id'][];
  status: OrderStatus;
}

export const mockOrders: Order[] = [
  // Новые заказы (IN_PROGRESS и DELIVERED) - сверху
  {
    id: 10,
    createdAt: '2026-01-22T09:30:00Z',
    estimatedDeliveryDate: '2026-02-01T18:00:00Z',
    products: [14, 15, 16],
    status: OrderStatus.IN_PROGRESS,
  },
  {
    id: 5,
    createdAt: '2026-01-20T11:00:00Z',
    estimatedDeliveryDate: '2026-01-30T18:00:00Z',
    products: [5, 6],
    status: OrderStatus.IN_PROGRESS,
  },
  {
    id: 7,
    createdAt: '2026-01-18T15:20:00Z',
    estimatedDeliveryDate: '2026-01-28T18:00:00Z',
    products: [8, 9, 10],
    status: OrderStatus.IN_PROGRESS,
  },
  {
    id: 1,
    createdAt: '2026-01-15T10:30:00Z',
    estimatedDeliveryDate: '2026-01-25T18:00:00Z',
    products: [1, 3],
    status: OrderStatus.IN_PROGRESS,
  },
  {
    id: 2,
    createdAt: '2026-01-20T14:20:00Z',
    estimatedDeliveryDate: '2026-01-30T18:00:00Z',
    products: [2, 4, 1],
    status: OrderStatus.DELIVERED,
  },
  {
    id: 6,
    createdAt: '2026-01-18T13:30:00Z',
    estimatedDeliveryDate: '2026-01-28T18:00:00Z',
    products: [7],
    status: OrderStatus.DELIVERED,
  },
  {
    id: 11,
    createdAt: '2026-01-16T14:00:00Z',
    estimatedDeliveryDate: '2026-01-26T18:00:00Z',
    products: [17, 18],
    status: OrderStatus.DELIVERED,
  },
  // Старые заказы (DONE и CANCELLED) - снизу
  {
    id: 9,
    createdAt: '2026-01-14T12:45:00Z',
    estimatedDeliveryDate: '2026-01-24T18:00:00Z',
    products: [13],
    status: OrderStatus.CANCELLED,
  },
  {
    id: 3,
    createdAt: '2026-01-12T09:15:00Z',
    estimatedDeliveryDate: '2026-01-22T18:00:00Z',
    products: [3],
    status: OrderStatus.CANCELLED,
  },
  {
    id: 4,
    createdAt: '2026-01-08T16:45:00Z',
    estimatedDeliveryDate: '2026-01-18T18:00:00Z',
    products: [4, 1, 2],
    status: OrderStatus.DONE,
  },
  {
    id: 12,
    createdAt: '2026-01-05T16:15:00Z',
    estimatedDeliveryDate: '2026-01-15T18:00:00Z',
    products: [19],
    status: OrderStatus.DONE,
  },
  {
    id: 8,
    createdAt: '2026-01-03T10:00:00Z',
    estimatedDeliveryDate: '2026-01-13T18:00:00Z',
    products: [11, 12],
    status: OrderStatus.DONE,
  },
]
