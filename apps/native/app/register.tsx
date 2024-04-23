import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { COLORS } from "@/constants";
import RegisterForm from "@/components/screens/form-auth/RegisterForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { secureStoreGet } from "@/lib/session";

const queryClient = new QueryClient();

export default function RegisterPage() {
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
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                padding: 10,
                fontSize: 20,
                paddingBottom: 0,
                justifyContent: "center",
              }}
            >
              Create a new account
            </Text>
            <RegisterForm />
          </View>
        </ScrollView>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
