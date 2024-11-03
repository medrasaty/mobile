// TODO: Abastract the page away
// import Page from "@/components/Page";
// import { ThemedText } from "@/components/ThemedText";
// import { ActivityIndicator } from "react-native";
// import { UserGridList } from "../components/UsersGridList";
// import {UseQueryResult} from "@tanstack/react-query";
// import {BaseUser} from "@/types/user.types";

// type SharedFriendshipScreenProps = {
//     queryStatus: UseQueryResult<any, unknown>['status']
//     data: UseQueryResult<BaseUser[]>['data']
// }

// const SharedFriendshipScreen = ({}: SharedFriendshipScreenProps) => {
//   return (
//     <Page>
//       {queryStatus.isPending ? (
//         <ActivityIndicator />
//       ) : query.isError ? (
//         <ThemedText>Error</ThemedText>
//       ) : query.data ? (
//         <UserGridList
//           onRefresh={query.refetch}
//           isRefreshing={query.isRefetching}
//           users={query.data}
//         />
//       ) : (
//         <ThemedText>Couldn't get the data</ThemedText>
//       )}
//     </Page>
//   );
// };

// export default FollowingScreen;
