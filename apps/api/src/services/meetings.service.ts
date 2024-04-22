import { getMeetingsByUser } from "@/repositories/meetings.repository";
import { Meeting } from "@repo/shared";

export const findAll = async (): Promise<Meeting[]> => {
    return await getMeetingsByUser("");
};

// todo add validation
// todo add db transaction 
// export const create = async (input: RawAccount): Promise<Account> => {
//   const results = await db().insert(accountTable).values(input).returning();
//   return results[0]!;
// };

// export const findById = async (id: number): Promise<Account | undefined> => {
//   const results = await db().select().from(accountTable).where(eq(accountTable.id, id));
//   return results[0];
// };

// export const transfer = async (transfer: Transfer): Promise<void> => {
//   await db().transaction(async (tx) => {
//     await tx
//       .update(accountTable)
//       .set({ balance: sql`${accountTable.balance} - ${transfer.amount}` })
//       .where(eq(accountTable.id, transfer.senderId));
//     await tx
//       .update(accountTable)
//       .set({ balance: sql`${accountTable.balance} + ${transfer.amount}` })
//       .where(eq(accountTable.id, transfer.recipientId));
//   });
// };