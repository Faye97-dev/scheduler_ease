import React, { useRef, useCallback, useMemo } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import testIDs from "./constants";
import { formatAgendaItems, getMarkedDates } from "./helpers";
import AgendaItem from "./AgendaItem";
import { getTheme, themeColor, lightThemeColor } from "./theme";
import { useGenericQuery } from "@/hooks/useApi";
import { COLORS, QUERY_MEETINGS_LIST } from "@/constants";
import { UserWithMeetingType } from "@/types";
import { IUserInfo } from "@/lib/session";

interface Props {
  weekView?: boolean;
  session: IUserInfo | null;
}

const ExpandableCalendarScreen = (props: Props) => {
  const { weekView } = props;
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({ todayButtonTextColor: themeColor });

  const { isLoading, data } = useGenericQuery<
    null,
    { payload: UserWithMeetingType }
  >({
    queryKey: QUERY_MEETINGS_LIST,
    requestData: {
      method: "GET",
      url: "/meetings",
      token: props.session?.token || "",
    },
  });

  const meetings = useMemo(() => data?.payload?.meetings || [], [data]);

  const marked = useMemo(
    () => getMarkedDates(formatAgendaItems(meetings)),
    [data]
  );

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  if (isLoading)
    return <ActivityIndicator size="large" color={COLORS["yinmn-blue"]} />;

  return (
    <CalendarProvider
      theme={todayBtnTheme.current}
      date={new Date().toISOString()}
    >
      {weekView ? (
        <WeekCalendar
          firstDay={1}
          markedDates={marked}
          testID={testIDs.weekCalendar.CONTAINER}
        />
      ) : (
        <ExpandableCalendar
          firstDay={1}
          markedDates={marked}
          theme={theme.current}
          testID={testIDs.expandableCalendar.CONTAINER}
        />
      )}
      <AgendaList
        renderItem={renderItem}
        sectionStyle={styles.section}
        sections={formatAgendaItems(meetings)}
      />
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: "lightgrey",
  },
  section: {
    backgroundColor: lightThemeColor,
    color: "grey",
    textTransform: "capitalize",
  },
});
