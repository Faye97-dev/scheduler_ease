import { AgendaItemType, UserWithMeetingType } from "@/types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

export type MarkedDates = {
  [key: string]: any;
};

export const formatAgendaItems = (
  meetings: UserWithMeetingType["meetings"]
) => {
  const agendaItems: AgendaItemType[] = [];
  const dates: string[] = [];

  meetings.map((meeting) => {
    const agendaDate = moment(new Date(meeting.startDate)).format("YYYY-MM-DD");
    const formatedStartDate = moment(new Date(meeting.startDate)).format(
      "YYYY-MM-DD HH:MM"
    );
    const formatedEndDate = moment(new Date(meeting.endDate)).format(
      "YYYY-MM-DD HH:MM"
    );
    if (dates.includes(agendaDate)) {
      agendaItems
        .find((item) => item.title === agendaDate)
        ?.data.push({
          title: meeting.title,
          description: meeting.description || "",
          end_date: formatedEndDate,
          start_date: formatedStartDate,
          participants: meeting.participants.map((item) => item.email),
        });
    } else {
      agendaItems.push({
        title: agendaDate,
        data: [
          {
            title: meeting.title,
            description: meeting.description || "",
            end_date: formatedEndDate,
            start_date: formatedStartDate,
            participants: meeting.participants.map((item) => item.email),
          },
        ],
      });
      dates.push(agendaDate);
    }
    // console.log(dates, agendaItems);
  });
  return agendaItems;
};

export function getMarkedDates(agendaItems: AgendaItemType[]) {
  const marked: MarkedDates = {};

  agendaItems.forEach((item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
  });
  return marked;
}
