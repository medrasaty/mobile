import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import UserProfileScreen from "@/features/profile/screens/UserProfileScreen";
import { BaseUser } from "@/types/user.types";
import { useLocalSearchParams } from "expo-router";

type UserProfilePageProps = {};

const UserProfilePage = ({}: UserProfilePageProps) => {
  const { username } = useLocalSearchParams<{
    username: BaseUser["username"];
  }>();

  return <UserProfileScreen username={username} />;
};

export default UserProfilePage;
