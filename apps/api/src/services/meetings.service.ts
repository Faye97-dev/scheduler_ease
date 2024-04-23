import { db } from "@/db/client";
import { CreateMeetingDto } from "@/dtos/create-meeting.dto";
import { findUserMeetings } from "@/repositories/meetings.repository";
import { Meeting, meetings, participants } from "@/db/schema";
import { UserWithMeetingType } from "@/types";

export const getUserMeetings = (userId: string): Promise<UserWithMeetingType> => {
    return findUserMeetings(userId);
};

export const createMeetingWithParticipants = (
    createMeetingDto: CreateMeetingDto, user_id: string
): Promise<Meeting> => {
    const { participants: participantsToCreate, ...newMeeting } = createMeetingDto;
    console.log("before transaction: ", newMeeting);
    return db.transaction(async (tx) => {
        console.log("creating meeting: ", newMeeting);
        const createdMeetings = await tx
            .insert(meetings)
            .values({
                ...newMeeting,
                createdBy: user_id,
                startDate: new Date(newMeeting.startDate),
                endDate: new Date(newMeeting.endDate),
            })
            .returning();

        await tx.insert(participants).values(
            participantsToCreate.map((email) => ({
                email,
                meetId: createdMeetings[0].id,
            }))
        );
        return createdMeetings[0];
    });
};

