import UserProfileScreen from "@/features/profile/screens/UserProfileScreen";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useSession } from "@/hooks/useSession";
import { useLocalSearchParams } from "expo-router";

const Profile = () => {
  const user = useCurrentUser();
  return <UserProfileScreen username={user?.username} />;
};

export default Profile;
