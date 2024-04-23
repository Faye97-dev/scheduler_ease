import { Meeting, Participant, User } from "./db/schema"

export type UserWithMeetingType = User & {
    meetings: Meeting & {
        participants: Participant[]
    }[]
}