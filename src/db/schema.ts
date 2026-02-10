import {
  pgTable,
  text,
  uuid,
  timestamp,
  varchar,
  integer,
  boolean,
  real,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { OrderStatus } from '@/types/order';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: varchar('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  pic: text('pic').notNull(),
  description: text('description').notNull(),
  material: varchar('material', { length: 255 }).notNull(),
  brand: varchar('brand', { length: 255 }).notNull(),
  size: text('size').array().notNull(),
  productType: varchar('product_type', { length: 255 }).notNull(),
  color: varchar('color', { length: 255 }),
  weight: varchar('weight', { length: 255 }),
  price: integer('price').notNull(),
  rating: real('rating').notNull(),
  inStock: boolean('in_stock'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 50 }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  estimatedDeliveryDate: timestamp('estimated_delivery_date').notNull()
    .defaultNow(),
  status: varchar('status', { enum: Object.values(OrderStatus) as [OrderStatus, ...OrderStatus[]], length: 255 }).notNull().default(OrderStatus.IN_PROGRESS),
});

export const orderProducts = pgTable('order_products', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'restrict' }),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ many }) => ({
  orderProducts: many(orderProducts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  products: many(orderProducts),
}));

export const orderProductsRelations = relations(orderProducts, ({ one }) => ({
  order: one(orders, {
    fields: [orderProducts.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderProducts.productId],
    references: [products.id],
  }),
}));
