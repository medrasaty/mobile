import Page from "@/components/Page";
import { useBlackListUsers } from "../queries";
import ScreenList from "@/components/ScreenFlatList";
import BlackListUserCell from "../components/BlackListUserCell";

type BlackListScreenProps = {};

const BlackListScreen = ({}: BlackListScreenProps) => {
  const q = useBlackListUsers();
  return (
    <Page>
      <ScreenList
        renderItem={({ item, index }) => {
          return <BlackListUserCell key={index} user={item} />;
        }}
        data={q.data}
        estimatedItemSize={100}
        keyExtractor={(item) => item.username}
        isPending={q.isPending}
        isError={q.isError}
        onRetry={q.refetch}
        refreshing={q.isRefetching}
        onRefresh={q.refetch}
      />
    </Page>
  );
};

export const BlackListUsersList = () => {
  return;
};

export default BlackListScreen;
