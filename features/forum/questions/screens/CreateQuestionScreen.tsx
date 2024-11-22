import { useCreateQuestionMutation } from "@/features/forum/questions/mutations";
import { router } from "expo-router";
import { questionDetail } from "@/lib/routing";
import QuestionForm from "../components/forms/QuestionForm";
import Page from "@components/Page";
import { Keyboard } from "react-native";

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
