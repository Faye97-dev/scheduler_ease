import { relations } from "drizzle-orm";
import {
    timestamp,
    varchar,
    primaryKey,
    pgTable,
    uuid,
} from "drizzle-orm/pg-core";
import { meetings } from "./meetings";

export const participants = pgTable(
    "participants",
    {
        meetId: uuid("meet_id")
            .references(() => meetings.id)
            .notNull(),
        email: varchar("email", { length: 256 }).notNull(),
        createdDate: timestamp("created_date").notNull().defaultNow(),
        updatedDate: timestamp("updated_date")
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.meetId, table.email] }),
        };
    }
);
export const participantsRelations = relations(participants, ({ one }) => ({
    meeting: one(meetings, {
        fields: [participants.meetId],
        references: [meetings.id],
    }),
}));

export type Participant = typeof participants.$inferSelect;
export type ParticipantInsert = typeof participants.$inferInsert;
