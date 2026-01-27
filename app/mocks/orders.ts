import { users } from '@/app/lib/placeholder-data';
import { Product, mockProducts } from '@/app/mocks/products';

export enum OrderStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}

export interface Order {
  id: string;
  userId: string;
  createdAt: string;
  estimatedDeliveryDate: string;
  products: Product['id'][];
  status: OrderStatus;
}

// export const mockOrders: Order[] = [
//   {
//     id: '10',
//     userId: users[0].id,
//     createdAt: '2026-01-22T09:30:00Z',
//     estimatedDeliveryDate: '2026-02-01T18:00:00Z',
//     products: [mockProducts[0].id, mockProducts[1].id, mockProducts[2].id],
//     status: OrderStatus.IN_PROGRESS,
//   },
//   {
//     id: '5',
//     userId: users[0].id,
//     createdAt: '2026-01-20T11:00:00Z',
//     estimatedDeliveryDate: '2026-01-30T18:00:00Z',
//     products: [mockProducts[5].id, mockProducts[6].id],
//     status: OrderStatus.IN_PROGRESS,
//   },
//   {
//     id: '7',
//     userId: users[0].id,
//     createdAt: '2026-01-18T15:20:00Z',
//     estimatedDeliveryDate: '2026-01-28T18:00:00Z',
//     products: [mockProducts[8].id, mockProducts[9].id, mockProducts[10].id],
//     status: OrderStatus.IN_PROGRESS,
//   },
//   {
//     id: '1',
//     userId: users[0].id,
//     createdAt: '2026-01-15T10:30:00Z',
//     estimatedDeliveryDate: '2026-01-25T18:00:00Z',
//     products: [mockProducts[1].id, mockProducts[3].id],
//     status: OrderStatus.IN_PROGRESS,
//   },
//   {
//     id: '2',
//     userId: users[0].id,
//     createdAt: '2026-01-20T14:20:00Z',
//     estimatedDeliveryDate: '2026-01-30T18:00:00Z',
//     products: [mockProducts[2].id, mockProducts[4].id, mockProducts[1].id],
//     status: OrderStatus.DELIVERED,
//   },
//   {
//     id: '6',
//     userId: users[0].id,
//     createdAt: '2026-01-18T13:30:00Z',
//     estimatedDeliveryDate: '2026-01-28T18:00:00Z',
//     products: [7],
//     status: OrderStatus.DELIVERED,
//   },
//   {
//     id: '11',
//     userId: users[0].id,
//     createdAt: '2026-01-16T14:00:00Z',
//     estimatedDeliveryDate: '2026-01-26T18:00:00Z',
//     products: [17, 18],
//     status: OrderStatus.DELIVERED,
//   },
//   {
//     id: '9',
//     userId: users[0].id,
//     createdAt: '2026-01-14T12:45:00Z',
//     estimatedDeliveryDate: '2026-01-24T18:00:00Z',
//     products: [13],
//     status: OrderStatus.CANCELLED,
//   },
//   {
//     id: '3',
//     userId: users[0].id,
//     createdAt: '2026-01-12T09:15:00Z',
//     estimatedDeliveryDate: '2026-01-22T18:00:00Z',
//     products: [3],
//     status: OrderStatus.CANCELLED,
//   },
//   {
//     id: '4',
//     userId: users[0].id,
//     createdAt: '2026-01-08T16:45:00Z',
//     estimatedDeliveryDate: '2026-01-18T18:00:00Z',
//     products: [4, 1, 2],
//     status: OrderStatus.DONE,
//   },
//   {
//     id: '12',
//     userId: users[0].id,
//     createdAt: '2026-01-05T16:15:00Z',
//     estimatedDeliveryDate: '2026-01-15T18:00:00Z',
//     products: [19],
//     status: OrderStatus.DONE,
//   },
//   {
//     id: '8',
//     userId: users[0].id,
//     createdAt: '2026-01-03T10:00:00Z',
//     estimatedDeliveryDate: '2026-01-13T18:00:00Z',
//     products: [11, 12],
//     status: OrderStatus.DONE,
//   },
// ]
