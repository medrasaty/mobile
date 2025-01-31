import PlaceholderPage from "@components/PlaceholderPage";
import { View, ViewProps } from "react-native";

type BookmarkedQuestionsScreenProps = {} & ViewProps;

const BookmarkedQuestionsScreen = ({
  ...props
}: BookmarkedQuestionsScreenProps) => {
  return <PlaceholderPage title="questions" />;
};

export default BookmarkedQuestionsScreen;
