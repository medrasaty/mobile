import { ThemedView } from "@/components/ThemedView";
import { FlatListProps } from "react-native";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import NetworkError, { NetworkErrorProps } from "./NetworkError";
import Animated, { LinearTransition } from "react-native-reanimated";
import { StyleSheet } from "react-native";

type ScreenListProps<T> = {
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
} & FlatListProps<T>;

export default function ScreenList<T>({
  isPending,
  isError,
  onRetry,
  errorMessage,
  data,
  ...listProps
}: ScreenListProps<T>) {
  return (
    <>
      {isPending ? (
        <FullPageLoadingIndicator />
      ) : data ? (
        <Animated.FlatList
          data={data}
          {...listProps}
          itemLayoutAnimation={LinearTransition}
        />
      ) : (
        <ScreenError message={errorMessage} onRetry={onRetry} />
      )}
    </>
  );
}

export const ScreenError = (props: NetworkErrorProps) => {
  return (
    <ThemedView style={styles.screenErrorContainer}>
      <NetworkError {...props} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  screenErrorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
