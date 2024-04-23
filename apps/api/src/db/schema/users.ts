import { relations } from 'drizzle-orm';
import { timestamp, varchar } from 'drizzle-orm/pg-core';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { meetings } from './meetings';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    fullName: varchar("full_name", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    createdDate: timestamp('created_date').notNull().defaultNow(),
    updatedDate: timestamp('updated_date').notNull().defaultNow().$onUpdate(() => new Date()),
});
export const usersRelations = relations(users, ({ many }) => ({
    meetings: many(meetings),
    users: many(users),
}))

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
