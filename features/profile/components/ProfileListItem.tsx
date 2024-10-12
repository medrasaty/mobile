import { ContainerView } from "@/components/styled";
import QuestionCard from "@/features/forum/components/question/QuestionCard";
import ProfileNavigator from "../components/ProfileQuestionAnswerNavigator";

import AnswerCell from "@/features/forum/components/answer/AnswerCell";
import {
  DEFAULT_EMTY_CELL_HEIGHT,
  ProfileListNavigatorButtons,
  ProfileListTypedData,
  ProfileListTypedDataChoices,
} from "../screens/UserProfileScreen";
import { ViewProps } from "react-native";
import { ProfileListSortingMenu } from "./ProfileListSortingMenu";
import { ThemedView } from "@/components/ThemedView";
import { DEFAULT_ICON_SIZE } from "@expo/vector-icons/build/createIconSet";

type ProfileListItemProps = {
  item: ProfileListTypedData;
} & ViewProps;

export const ProfileListItem = ({ item, ...props }: ProfileListItemProps) => {
  switch (item.type) {
    case ProfileListTypedDataChoices.QUESTION:
      return <QuestionCard question={item.payload} key={item.payload.id} />;
    case ProfileListTypedDataChoices.ANSWER:
      return <AnswerCell answer={item.payload} key={item.payload.id} />;
    case ProfileListTypedDataChoices.NAVIGATOR:
      return (
        <ProfileNavigator
          navigatorButtons={ProfileListNavigatorButtons}
          style={{ paddingTop: 20 }}
        />
      );
    case ProfileListTypedDataChoices.FILTER:
      return (
        <ContainerView key={item.type} style={{ marginTop: 20 }}>
          <ProfileListSortingMenu />
        </ContainerView>
      );

    case ProfileListTypedDataChoices.EMPTY:
      // render emtpy cell with default height as placeholder
      return (
        <ThemedView
          style={{ width: "100%", height: DEFAULT_EMTY_CELL_HEIGHT }}
        />
      );
    default:
      return null;
  }
};
