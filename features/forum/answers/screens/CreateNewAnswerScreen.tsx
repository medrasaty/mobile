import Page from "@components/Page";
import ServerView from "@components/ServerView";
import { ThemedText } from "@components/ThemedText";
import { useQuestionIdParams } from "@forum/questions/hooks";
import Animated from "react-native-reanimated";
import { Container } from "@components/styled";
import { useRef } from "react";
import QuestionDetailInfo from "@forum/components/question/detail/QuestionDetailInfo";
import { router } from "expo-router";
import { Keyboard } from "react-native";
import { useForumQuestion } from "@forum/questions/queries";
import AnswerForm from "../components/forms/AnswerForm";
import useMutateAnswer from "../mutations";

const CreateNewAnswerScreen = () => {
  const questionId = useQuestionIdParams();
  const questionQuery = useForumQuestion(questionId);

  // TODO: Handle it better
  if (!questionId) return <ThemedText>you can not view this screen</ThemedText>;

  const ref = useRef<Animated.ScrollView>(null);

  const { mutate: create } = useMutateAnswer();

  return (
    <Page>
      <Animated.ScrollView showsVerticalScrollIndicator={false} ref={ref}>
        <Container>
          <ServerView status={questionQuery.status}>
            {questionQuery.data && (
              <QuestionDetailInfo
                {...questionQuery.data}
                question={questionQuery.data}
              />
            )}
          </ServerView>
          {/* FIXME: move up when keyboard shows */}
          {/* Do not forget to set question manually  */}
          <AnswerForm
            initialValues={{ text: "", picture: "", question: questionId }}
            onSubmit={(values, { setSubmitting }) => {
              // handle submit
              Keyboard.dismiss();
              create(values, {
                onSuccess: () => {
                  router.back();
                },
                onSettled: () => {
                  setSubmitting(false);
                },
              });
            }}
          />
        </Container>
      </Animated.ScrollView>
    </Page>
  );
};

export default CreateNewAnswerScreen;
