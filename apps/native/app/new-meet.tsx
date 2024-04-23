import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet } from "react-native";

import { View } from "react-native";
import { Stack, router } from "expo-router";
import AddMeetForm from "@/components/screens/form-add-meet/AddMeetForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "@/constants";
import { useEffect, useState } from "react";
import { IUserInfo, secureStoreGet } from "@/lib/session";

const queryClient = new QueryClient();

export default function ModalScreen() {
  const [session, setSession] = useState<IUserInfo | null>(null);

  useEffect(() => {
    secureStoreGet("session").then((res: any) => {
      if (!res) router.push("/login");
      else setSession(JSON.parse(res));
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitle: "Add a meeting",
          }}
        />
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <AddMeetForm session={session} />
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </ScrollView>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: COLORS["antiflash-white"],
  },
  title: { fontSize: 18 },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
