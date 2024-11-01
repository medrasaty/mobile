import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
// import { MaterialDrawerContent } from "@/features/navigation/layouts/Drawer";
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "@/components/styled";
import { Drawer as MaterialDrawer } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import MaterialDrawerItemList from "@/features/navigation/components/MaterialDrawerItemList";
import { useWindowDimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  AnimatedAppBar,
  AppBar,
} from "@/features/navigation/components/AppBar";
import { debugStyle } from "@/constants/styels";

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
      screenOptions={{ headerShown: false }}
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
    </Drawer>
  );
}
