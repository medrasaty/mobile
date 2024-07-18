import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export default function TabBarIcon({
  icon_name,
  color,
  size,
  focused,
}: {
  icon_name: any; // FIXME: replace "any" with correct type
  color: string;
  size: number;
  focused: boolean;
}) {
  const theme = useTheme();
  const name = focused ? icon_name : `${icon_name}-outline`;
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}
