import Row from "@components/Row";
import { ThemedText } from "@components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { View, ViewProps } from "react-native";
import { useTheme, TextProps } from "react-native-paper";

type SchoolNameProps<T> = {
  /**
   * School name, required
   */
  name: string;
  /**
   * props to apply for the name
   */
  lableProps?: Omit<TextProps<T>, "children">;
  /**
   * school icon size default 25
   */
  iconSize?: number;
} & ViewProps;

/**
 * Text components that renders a school icon near school name
 * @param name : string
 * @returns
 */

export default function SchoolName<T>({
  name,
  lableProps,
  iconSize,
  ...props
}: SchoolNameProps<T>) {
  const theme = useTheme();
  return (
    <Row style={{ gap: 10 }} alignItems="center" {...props}>
      <ThemedText {...lableProps}>{name}</ThemedText>
      <Ionicons
        color={theme.colors.error}
        name="school-sharp"
        size={iconSize ?? 22}
      />
    </Row>
  );
}
