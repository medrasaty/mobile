import useUserIdParams from "@features/profile/hooks/useUsernameParam";
import UserProfileScreen from "@features/profile/screens/UserProfileScreen";

const UserProfilePage = () => {
  const userId = useUserIdParams()

  return <UserProfileScreen id={userId} />;
};

export default UserProfilePage;
