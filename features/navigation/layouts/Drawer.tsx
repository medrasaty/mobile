import { SafeAreaView } from "@/components/styled";
import { Drawer } from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import MaterialDrawerItemList from "../components/MaterialDrawerItemList";
import { useWindowDimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export const MaterialDrawerContent = (props: DrawerContentComponentProps) => {
  const { height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <DrawerContentScrollView
        style={{ height }}
        {...props}
        scrollEnabled={false}
      >
        <Drawer.Section>
          <MaterialDrawerItemList {...props} />
        </Drawer.Section>
      </DrawerContentScrollView>
      <DrawerFooter />
    </SafeAreaView>
  );
};

export const DrawerFooter = () => {
  return (
    <ThemedView style={{ position: "absolute", bottom: 0 }}>
      <ThemedText>DrawerFooter</ThemedText>
    </ThemedView>
  );
};
