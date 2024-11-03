import { SafeAreaView } from "@/components/styled";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AppBar } from "@/features/navigation/components/AppBar";
import MaterialDrawerItemList from "@/features/navigation/components/MaterialDrawerItemList";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import "react-native-gesture-handler";
import { Drawer as MaterialDrawer } from "react-native-paper";

export const MaterialDrawerContent = (props: DrawerContentComponentProps) => {
  const { height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <DrawerContentScrollView
        style={{ height }}
        {...props}
        scrollEnabled={false}
      >
        <MaterialDrawer.Section>
          <MaterialDrawerItemList {...props} />
        </MaterialDrawer.Section>
      </DrawerContentScrollView>
      <DrawerFooter />
    </SafeAreaView>
  );
};

export const DrawerFooter = () => {
  return (
    <ThemedView
      style={{
        position: "absolute",
        bottom: 0,
        left: 90,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>DrawerFooter</ThemedText>
    </ThemedView>
  );
};
export default function DrawerLayout() {
  const { t } = useTranslation();
  return (
    <Drawer
      drawerContent={MaterialDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontSize: 98,
        },
      }}
      initialRouteName="(tabs)"
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: t("Home"),
          drawerIcon: (props) => <Ionicons name="home-outline" {...props} />,
        }}
      />

      <Drawer.Screen
        options={{
          headerShown: true,
          header(props) {
            return (
              <AppBar
                //@ts-ignore
                options={{ mode: "center-aligned" }}
                title={t("bookmarks")}
              />
            );
          },
          title: t("Bookmarks"),
          drawerIcon: (props) => {
            return <Ionicons name="bookmark-outline" {...props} />;
          },
        }}
        name="bookmarks"
      />

      <Drawer.Screen
        name="friends"
        options={{
          headerShown: true,
          header(props) {
            return (
              <AppBar
                //@ts-ignore
                options={{ mode: "center-aligned" }}
                title={t("friends")}
              />
            );
          },
          title: t("Friends"),
          drawerIcon: (props) => {
            return <Ionicons name="people-outline" {...props} />;
          },
        }}
      />

      <Drawer.Screen
        name="following_requests"
        options={{
          headerShown: true,
          header(props) {
            return (
              <AppBar
                //@ts-ignore
                options={{ mode: "center-aligned" }}
                title={t("Following_requests")}
              />
            );
          },
          title: t("Following_requests"),
          drawerIcon: (props) => {
            return (
              <MaterialCommunityIcons name="message-text-outline" {...props} />
            );
          },
        }}
      />

      <Drawer.Screen
        name="your_following_requests"
        options={{
          headerShown: true,
          header(props) {
            return (
              <AppBar
                //@ts-ignore
                options={{ mode: "center-aligned" }}
                title={t("Your_following_requests")}
              />
            );
          },
          title: t("Your_following_requests"),
          drawerIcon: (props) => {
            return <Ionicons name="send" {...props} />;
          },
        }}
      />
    </Drawer>
  );
}
