import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useSession } from "@/hooks/useSession";
import useFollowingRequestsToMe from "../hooks/useFollowingRequestsToMe";
import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import { FollowingRequest } from "../types";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import FollowingRequestsToMeCell from "../components/FollowingRequestToMeCell";
import { Divider } from "react-native-paper";

type FollowingRequestsToMeScreenProps = {};

const FollowingRequestsToMeScreen = ({}: FollowingRequestsToMeScreenProps) => {
  const user = useCurrentUser();
  return user.is_private ? <FollowingRequestsToMe /> : <NotPrivateAccount />;
};

export const FollowingRequestsToMe = () => {
  const query = useFollowingRequestsToMe({ status: "pending" });
  return (
    <Page>
      {query.isPending ? (
        <FullPageLoadingIndicator />
      ) : query.isSuccess ? (
        <FollowingRequestsToMeList data={query.data} />
      ) : (
        <Error />
      )}
    </Page>
  );
};

type FollowingRequestsToMeListProps = Omit<
  Omit<FlashListProps<FollowingRequest>, "renderItem">,
  "estimatedItemSize"
>;

const FollowingRequestsToMeList = ({
  data,
  ...props
}: FollowingRequestsToMeListProps) => {
  return (
    <FlashList
      renderItem={({ item, index }) => {
        return <FollowingRequestsToMeCell request={item} />;
      }}
      estimatedItemSize={120}
      data={data}
      {...props}
    />
  );
};

const Error = () => {
  return <ThemedText>Error</ThemedText>;
};

const NotPrivateAccount = () => {
  // TODO: create beautifull and descriptfull page
  return (
    <Page>
      <ThemedView>
        <ThemedText>
          You must change your account type to see this page.
        </ThemedText>
      </ThemedView>
    </Page>
  );
};

export default FollowingRequestsToMeScreen;
