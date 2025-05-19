import { ThemedText } from "@components/ThemedText";
import { TextProps } from "react-native-paper";

type BiographyProps<T> = {} & TextProps<T>;

/**
 * Biography - A styled text component for displaying user biography
 *
 * @param BiographyProps props - Component props
 * @returns React.ReactElement A styled text component
 */
const Biography = ({ children, ...props }: BiographyProps<any>) => {
  return (
    <ThemedText color={"lightgray"} variant="bodyMedium" {...props}>
      {children}
    </ThemedText>
  );
};

export default Biography;
