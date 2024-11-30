import ProfileMainScreen from "@/features/profile/screens/ProfileMainScreen";
import useUserIdParams from "@features/profile/hooks/useUsernameParam";

const UserProfilePage = () => {
  const userId = useUserIdParams()

  return <ProfileMainScreen id={userId} />;
};

export default UserProfilePage;
