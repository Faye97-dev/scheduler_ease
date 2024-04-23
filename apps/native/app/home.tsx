import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { COLORS } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";
import ExpandableCalendarScreen from "@/components/screens/calendar/Calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IUserInfo, secureStoreGet, secureStoreRemove } from "@/lib/session";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<IUserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    secureStoreGet("session").then((res: any) => {
      if (!res) router.push("/login");
      else setSession(JSON.parse(res));
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS["white"] }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS["yinmn-blue"] },
            headerShadowVisible: false,
            headerTitleStyle: { color: COLORS["white"] },
            headerRight: () => (
              <Link href="/new-meet" asChild>
                <Pressable>
                  {({ pressed }) => {
                    return (
                      <FontAwesome
                        size={20}
                        name="plus"
                        style={{
                          color: COLORS["white"],
                          opacity: pressed ? 0.5 : 1,
                        }}
                      />
                    );
                  }}
                </Pressable>
              </Link>
            ),
            headerLeft: () => (
              <Pressable
                onPress={async () => {
                  setLoading(true);
                  await secureStoreRemove("session");
                  setLoading(false);
                  router.replace("/login");
                }}
              >
                {({ pressed }) => {
                  return (
                    <>
                      {loading ? (
                        <ActivityIndicator
                          size="small"
                          color={COLORS["white"]}
                        />
                      ) : (
                        <FontAwesome
                          size={20}
                          name="user-times"
                          style={{
                            color: COLORS["white"],
                            opacity: pressed ? 0.5 : 1,
                          }}
                        />
                      )}
                    </>
                  );
                }}
              </Pressable>
            ),
            headerTitle: "Schedule ease",
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            Welcome{" "}
            <Text
              style={{
                color: COLORS["tint-Light"],
                fontWeight: "bold",
              }}
            >
              {session?.user?.fullName}
            </Text>
          </Text>
          <ExpandableCalendarScreen session={session} />
        </ScrollView>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
