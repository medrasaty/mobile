import { useAuthSession } from "@features/auth/store";
import CurrentUserProfileScreen from "@features/profile/screens/CurrentUserProfileScreen";
import { AuthUser } from "@features/auth/types";

const Profile = () => {
  const session = useAuthSession(state => state.session);
  const userId = session?.user?.id || 0;
  
  if (!session?.user) return null;
  
  return <CurrentUserProfileScreen id={userId} />;
};

export default Profile;
