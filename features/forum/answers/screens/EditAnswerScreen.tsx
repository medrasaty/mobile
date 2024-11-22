import Page from "@components/Page";
import ServerView, { ServerPage } from "@components/ServerView";
import { ThemedText } from "@components/ThemedText";
import { useQuestionIdParams } from "@forum/questions/hooks";
import Animated from "react-native-reanimated";
import { Container } from "@components/styled";
import { useEffect, useRef } from "react";
import QuestionDetailInfo from "@forum/components/question/detail/QuestionDetailInfo";
import { router } from "expo-router";
import { Keyboard } from "react-native";
import { useForumQuestion } from "@forum/questions/queries";
import AnswerForm from "../components/forms/AnswerForm";
import { answerSchemaType } from "../schema";
import { useForumAnswer } from "../queries";
import useAnswerIdParams from "../hooks";
import useMutateAnswer from "../mutations";

const EditAnswerScreen = () => {
  const questionId = useQuestionIdParams();
  const answerId = useAnswerIdParams();

  // TODO: Handle it better
  if (!questionId || !answerId)
    return <ThemedText>you can not view this screen</ThemedText>;

  const questionQuery = useForumQuestion(questionId);
  const answerQuery = useForumAnswer(answerId, { question: questionId });

  const { data: answer } = answerQuery;

  const ref = useRef<Animated.ScrollView>(null);

  const { mutate: edit } = useMutateAnswer(answerId);

  useEffect(() => {
    {
      /* fix glitch in response , maybe use keyboard avoiding view properly */
    }
    Keyboard.addListener("keyboardDidShow", () => {
      ref.current?.scrollToEnd({ animated: true });
    });
  }, []);

  const initialValues = {
    question: questionId ?? "",
    text: answer?.text ?? "",
    picture: answer?.picture ?? "",
  } as answerSchemaType;

  return (
    <ServerPage status={answerQuery.status}>
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
            edit
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              // handle submit
              Keyboard.dismiss();
              edit(values, {
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
    </ServerPage>
  );
};

export default EditAnswerScreen;
