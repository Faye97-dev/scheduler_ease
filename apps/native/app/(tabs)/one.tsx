import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "@/constants";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS["yinmn-blue"] },
          headerTitleStyle: {
            fontWeight: "bold",
            color: COLORS["white"],
          },
        }}
      />
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
    height: 2,
    width: "80%",
  },
});
