import ProfileMainScreen from "@/features/profile/screens/ProfileMainScreen";
import useCurrentUser from "@/hooks/useCurrentUser";

const Profile = () => {
  const user = useCurrentUser();
  return <ProfileMainScreen username={user?.username} />;
};

export default Profile;
