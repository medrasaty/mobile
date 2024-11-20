import { AppBar } from "@/features/navigation/components/AppBar";
import { useSegments } from "expo-router";
import { Appbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

type UserContentAppBarProps<T> = {};

export default function UserContentAppBar<T>({
  ...props
}: UserContentAppBarProps<T>) {
  const { t } = useTranslation();
  const segment = useSegments();
  const currentPage = segment[segment.length - 1]; // get the last segment

  if (currentPage === "questions") {
    return <QuestionAppBar />;
  } else if (currentPage === "answers") {
    return <AnswerAppBar />;
  }

  return <AppBar title={t(currentPage)} />;
}

export const AnswerAppBar = () => {
  const { t } = useTranslation();
  return (
    <AppBar title={t("answers")}>
      <Appbar.Action icon={"magnify"} onPress={() => alert("search answers")} />
    </AppBar>
  );
};

export const QuestionAppBar = () => {
  const { t } = useTranslation();
  return (
    <AppBar title={t("questions")}>
      <Appbar.Action
        icon={"magnify"}
        onPress={() => alert("search question")}
      />
    </AppBar>
  );
};
