import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const name = focused ? icon_name : `${icon_name}-outline`;
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}