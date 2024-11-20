import ProfileMainScreen from "@/features/profile/screens/ProfileMainScreen";
import { BaseUser } from "@/types/user.types";
import { useLocalSearchParams } from "expo-router";

type UserProfilePageProps = {};

const UserProfilePage = ({}: UserProfilePageProps) => {
  const { username } = useLocalSearchParams<{
    username: BaseUser["username"];
  }>();

  return <ProfileMainScreen username={username} />;
};

export default UserProfilePage;
