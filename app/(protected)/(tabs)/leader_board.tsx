import { Collapsible } from "@/components/Collapsible";
import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { debugStyle } from "@/constants/styels";
import { useSession } from "@/hooks/useSession";
import { SafeAreaView, View } from "react-native";
import PagerView from "react-native-pager-view";

type LeaderBoardProps = {};

const LeaderBoard = ({}: LeaderBoardProps) => {
  const { signOut } = useSession();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Page
        container
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText onPress={() => signOut()} variant="displayMedium">
          LeaderBoard
        </ThemedText>
      </Page>
    </SafeAreaView>
  );
};

export default LeaderBoard;
