import { View, ViewProps } from "react-native";
import useProfile from "../hooks/useProfile";
import Page from "@/components/Page";
import { ScreenListV2, ScreenListV3 } from "@/components/ScreenFlatList";
import { useCallback } from "react";
import useProfileQuestions from "../hooks/useProfileQuestions";
import ProfileHeader from "../components/Profile";

type ProfileMainScreenProps = { username: string } & ViewProps;

const ProfileMainScreen = ({ username, ...props }: ProfileMainScreenProps) => {
  const profileQ = useProfile(username);
  const questionsQ = useProfileQuestions(username);

  const renderHeader = useCallback(() => {
    if (profileQ.isSuccess) {
      return <ProfileHeader />;
    }
  }, [profileQ.data]);
};

export default ProfileMainScreen;
