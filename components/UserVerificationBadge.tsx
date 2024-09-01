import { UserType } from "@/types/user.types";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const UserVerificationBadge = ({ userType }: { userType: UserType }) => {
  const theme = useTheme();
  return (
    <MaterialIcons
      color={
        userType === UserType.STUDENT
          ? theme.colors.tertiary
          : theme.colors.error
      }
      size={15}
      name="verified"
    />
  );
};

export default UserVerificationBadge;
