import { useTheme, Chip } from "react-native-paper";
import Text from "./styled/Text";

const Tag = ({ name }: { name: string }) => {
  const theme = useTheme();
  return (
    <Chip
      mode="outlined"
      style={{ borderColor: theme.colors.primary }}
      onPress={() => {}}
      compact
    >
      <Text>{name}</Text>
    </Chip>
  );
};

export default Tag;
