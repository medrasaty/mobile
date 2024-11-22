import Page from "@/components/Page";
import { containerMargins, containerPaddings } from "@/constants/styels";
import { Keyboard, ScrollView, ViewProps } from "react-native";
import { Button } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import LoadingDialog from "@/components/LoadingDialog";
import { questionDetail } from "@/lib/routing";
import * as yup from "yup";
import { t } from "i18next";
import { Formik } from "formik";
import { useForumQuestion } from "../queries";
import { Question } from "@/types/forum.types";
import { useUpdateQuestionMutation } from "../mutations";
import * as QF from "@/features/forum/components/question/CreateNewQuestionPageComponents";
import ServerView from "@components/ServerView";
import FullPageLoadingIndicator from "@components/FullPageLoadingIndicator";
import QuestionForm from "../components/forms/QuestionForm";

interface EditQuestionScreenProps extends ViewProps {
  questionId: Question["id"];
}

export default function EditQuestionScreen({
  questionId,
  ...props
}: EditQuestionScreenProps) {
  const q = useForumQuestion(questionId);

  const initialValues = {
    title: q.data?.title ?? "",
    text: q.data?.text ?? "",
    subject: q.data?.subject ?? undefined,
    picture: q.data?.picture ?? "",
    tags: q.data?.tags ?? [],
  };

  const { mutate: update } = useUpdateQuestionMutation();

  if (q.isPending) return <FullPageLoadingIndicator />;

  return (
    <Page>
      <QuestionForm
        edit
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          Keyboard.dismiss();
          update(
            { questionId: questionId, data: values },
            {
              onSuccess: () => {
                router.replace(questionDetail({ questionId }));
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      />
    </Page>
  );
}
