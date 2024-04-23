// @ts-nocheck
import { db } from '@/db/client';
import { NotFoundError } from '@/lib/errors';
import { UserWithMeetingType } from '@/types';

export const findUserMeetings = async (userId: string) => {
    if (!userId) throw new NotFoundError('Undefined user id');

    const userWithMeetings: UserWithMeetingType = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
        with: {
            meetings: {
                with: { participants: true },
                orderBy: (meetings, { asc }) => [asc(meetings.startDate)],
            },

        },
    })

    if (!userWithMeetings) throw new NotFoundError('Meeting not found');

    return userWithMeetings
};
