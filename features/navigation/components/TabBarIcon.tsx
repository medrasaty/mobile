import { ThemedView } from "@/components/ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useUnreadNotificationsCount } from "@/features/notifications/hooks/useNotifications";

export type TabBarIconProps = {
  icon_name: string;
  active_icon_name: string;
  color: string;
  size: number;
  focused: boolean;
};

export default function TabBarIcon({
  icon_name,
  active_icon_name,
  color,
  size,
  focused,
}: TabBarIconProps) {
  const name = focused ? active_icon_name : icon_name;
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}

export function NotificationsTabBarIcon({ ...props }: TabBarIconProps) {
  const count = useUnreadNotificationsCount();
  return (
    <ThemedView style={{ backfaceVisibility: "hidden" }}>
      <Badge
        visible={Boolean(count)}
        style={styles.notificationBadge}
        size={props.size / 1.6}
      >
        {count}
      </Badge>
      <TabBarIcon {...props} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  notificationBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
});
