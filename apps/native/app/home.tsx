import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { Link, Stack } from "expo-router";
import { COLORS } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";
import ExpandableCalendarScreen from "@/screen/Calendar";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS["white"] }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS["yinmn-blue"] },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "bold",
            color: COLORS["white"],
          },
          headerRight: () => (
            <Link href="/new-meet" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    size={16}
                    name="info-circle"
                    color={COLORS.white}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          // headerLeft: () => (
          //   <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          // ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          // ),
          // headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <ExpandableCalendarScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
