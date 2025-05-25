import { useCreateQuestionMutation } from "@/features/forum/questions/mutations";
import { router } from "expo-router";
import { questionDetail } from "@/lib/routing";
import QuestionForm from "../components/forms/QuestionForm";
import Page from "@components/Page";
import { Keyboard } from "react-native";
import { Appbar } from "react-native-paper";
import { AppBar } from "@features/navigation/components/AppBar";

export default function CreateQuestionScreen() {
  const initialValues = {
    title: "",
    text: "",
    subject: undefined,
    picture: "",
    tags: [],
  };

  const { mutate: create } = useCreateQuestionMutation();

  return (
    <Page>
      <ScreenAppbar />
      <QuestionForm
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          Keyboard.dismiss();
          create(values, {
            onSuccess: (data, variables) => {
              // navigate to question detail page
              router.replace(questionDetail({ questionId: data.id }));
            },
            onSettled: () => {
              setSubmitting(false);
            },
          });
        }}
      />
    </Page>
  );
}


const ScreenAppbar = () => {
  return (
    <AppBar title="Create Question" />
  )
};