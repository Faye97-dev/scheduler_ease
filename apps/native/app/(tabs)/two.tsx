import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "@/constants";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: COLORS["yinmn-blue"] },
          headerTitleStyle: {
            fontWeight: "bold",
            color: COLORS["white"],
          },
        }}
      />
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS["dark"],
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
