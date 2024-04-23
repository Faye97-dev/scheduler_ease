import isEmpty from "lodash/isEmpty";
import React, { useCallback } from "react";
import { StyleSheet, Alert, View, Text, Pressable } from "react-native";
import testIDs from "./constants";
import { AgendaItemType } from "@/types";
import ParticipantsItems from "../form-add-meet/ParticipantsItems";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@/constants";

interface ItemProps {
  item: AgendaItemType["data"][0];
}

const AgendaItem = (props: ItemProps) => {
  const { item } = props;

  const buttonPressed = useCallback(() => {
    Alert.alert(item.description || item.title);
  }, []);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <View style={styles.item} testID={testIDs.agenda.ITEM}>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.inner}>
        <View>
          <Text style={styles.itemHourText}>
            Start date : {item.start_date}
          </Text>
          <Text style={styles.itemHourText}>End date : {item.end_date}</Text>
        </View>

        <View style={styles.itemButtonContainer}>
          <Pressable onPress={buttonPressed}>
            {({ pressed }) => {
              return (
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <Text>More</Text>
                  <FontAwesome
                    size={18}
                    name="info"
                    style={{
                      color: COLORS["tint-Light"],
                      opacity: pressed ? 0.5 : 0.7,
                    }}
                  />
                </View>
              );
            }}
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <ParticipantsItems items={item.participants} />
      </View>
    </View>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "column",
  },
  inner: {
    marginTop: 8,
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
    marginTop: 4,
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
