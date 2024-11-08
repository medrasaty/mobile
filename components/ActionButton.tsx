import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native-paper";

type ActionButtonProps = {};
/**
 * Extended Button that provide confirm dialog, loading dialog indicator,
 *
 */

const ActionButton = ({}: ActionButtonProps) => {
  return (
    <ThemedView>
      <Button>action</Button>
    </ThemedView>
  );
};

export default ActionButton;
