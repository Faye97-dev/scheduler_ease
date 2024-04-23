import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { COLORS } from "@/constants";
import LoginForm from "@/components/screens/form-auth/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { secureStoreGet } from "@/lib/session";

const queryClient = new QueryClient();

export default function LoginPage() {
  useEffect(() => {
    secureStoreGet("session").then((res) => {
      if (res) router.push("/home");
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS["white"] }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS["yinmn-blue"] },
            headerShadowVisible: false,
            headerTitleStyle: {
              color: COLORS["white"],
            },
            headerTitle: "",
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#eee" }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              paddingTop: 40,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                padding: 10,
                fontSize: 20,
                paddingBottom: 0,
              }}
            >
              Login
            </Text>
            <LoginForm />
          </View>
        </ScrollView>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
