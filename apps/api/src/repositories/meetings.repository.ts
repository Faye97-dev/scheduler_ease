import { eq } from 'drizzle-orm';

import { db } from '@/db/client';
import { NotFoundError } from '@/lib/errors';
import { meetings } from '@repo/shared';

export const getMeetingsByUser = async (userId: string) => {
    const meetings = await db.query.meetings.findMany({
        // where: (meetings, { eq }) => eq(meetings.title, userId), // todo fixme
        with: { user: true, participants: true },

    })
    return meetings
};

// todo fixme
export const getMeetingById = async (meetingId: string) => {
    const [meeting] = await db.select().from(meetings).where(eq(meetings.id, meetingId)).limit(1);
    if (!meeting) throw new NotFoundError('Meeting not found');

    return meeting;
};

