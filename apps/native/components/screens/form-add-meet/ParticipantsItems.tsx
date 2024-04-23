import * as React from "react";
import { Text, View, Pressable, ScrollView } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@/constants";

export default function ParticipantsItems({
  items,
  onPress,
}: {
  items: string[];
  onPress?: (val: string) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {items.map((item) => {
        return (
          <View
            style={{
              gap: 4,
              marginLeft: 4,
              display: "flex",
              borderRadius: 12,
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
              backgroundColor: onPress ? "white" : COLORS["tint-Light"],
            }}
            key={item}
          >
            <Text
              style={{
                fontSize: onPress ? 16 : 13,
                color: onPress ? "#000" : "white",
              }}
            >
              {item}
            </Text>
            {!!onPress && (
              <Pressable onPress={() => (onPress ? onPress(item) : null)}>
                {({ pressed }) => {
                  return (
                    <FontAwesome
                      size={17}
                      name="close"
                      style={{
                        color: "red",
                        opacity: pressed ? 0.5 : 0.7,
                      }}
                    />
                  );
                }}
              </Pressable>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
