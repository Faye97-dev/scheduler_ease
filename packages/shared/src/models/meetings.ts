import { relations } from 'drizzle-orm';
import { timestamp, varchar } from 'drizzle-orm/pg-core';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { participants } from './participants';

export const meetings = pgTable('meetings', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text('description'),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdBy: uuid('user_id').references(() => users.id).notNull(),
  createdDate: timestamp('created_date').notNull().defaultNow(),
  updatedDate: timestamp('updated_date').notNull().defaultNow().$onUpdate(() => new Date()),
});
export const meetingsRelations = relations(meetings, ({ one, many }) => ({
  user: one(users, {
    fields: [meetings.createdBy],
    references: [users.id],
  }),
  participants: many(participants),
}))

export type Meeting = typeof meetings.$inferSelect
export type MeetingInsert = typeof meetings.$inferInsert