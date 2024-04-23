export type UserWithMeetingType = UserType & {
    meetings: {
        id: string;
        createdDate: Date;
        updatedDate: Date;
        description: string | null;
        title: string;
        startDate: Date;
        endDate: Date;
        createdBy: string;
        participants: ParticipantType[]
    }[]
}

export type UserType = {
    id: string;
    fullName: string;
    email: string;
    createdDate: Date;
    updatedDate: Date;
}

export type MeetingType = {
    id: string;
    createdDate: Date;
    updatedDate: Date;
    description: string | null;
    title: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
}

export type ParticipantType = {
    email: string;
    createdDate: Date;
    updatedDate: Date;
    meetId: string;
}

export type AgendaItemType = {
    title: string;
    data: { start_date: string; end_date: string; title: string, participants: string[], description: string }[];
};
