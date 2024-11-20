import UserContentAppBar from "@/features/profile/components/UserContentAppBar";
import { Stack } from "expo-router";
import { View, ViewProps } from "react-native";
import { Divider } from "react-native-paper";

type UserLayoutProps = {} & ViewProps;

const UserLayout = ({ ...props }: UserLayoutProps) => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="detail">
      <Stack.Screen
        name="content"
        options={{
          title: "Content",
          headerShown: true,
          header: (props) => <UserContentAppBar {...props} />,
        }}
      />
    </Stack>
  );
};

export default UserLayout;
