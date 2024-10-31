import UserProfileScreen from "@/features/profile/screens/UserProfileScreen";
import useCurrentUser from "@/hooks/useCurrentUser";

const Profile = () => {
  const user = useCurrentUser();
  return <UserProfileScreen username={user?.username} />;
};

export default Profile;
