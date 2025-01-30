import { useAuthSession } from "@features/auth/store";
import CurrentUserProfileScreen from "@features/profile/screens/CurrentUserProfileScreen";

const Profile = () => {
  const user = useAuthSession(state => state.session?.user);
  return user ? <CurrentUserProfileScreen id={user.id} /> : null;
};

export default Profile;
