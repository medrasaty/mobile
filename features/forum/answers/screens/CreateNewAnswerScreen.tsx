import Page from "@components/Page";
import ServerView from "@components/ServerView";
import { ThemedText } from "@components/ThemedText";
import { AppBar } from "@features/navigation/components/AppBar";
import { useQuestion } from "@forum/hooks/useQuestions";
import { useQuestionIdParams } from "@forum/questions/hooks";
import Animated from "react-native-reanimated";
import { Button, Divider, TextInput, useTheme } from "react-native-paper";
import { Container } from "@components/styled";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { StyleSheet } from "react-native";
import { containerMargins } from "@/constants/styels";
import QuestionDetailInfo from "@forum/components/question/detail/QuestionDetailInfo";
import useCreateAnswerMutation from "@forum/hooks/useCreateAnswerMutation";
import LoadingDialog from "@components/LoadingDialog";
import { router } from "expo-router";
import { Keyboard } from "react-native";

const { height, width } = Dimensions.get("screen");

const CreateNewAnswerScreen = () => {
  const questionId = useQuestionIdParams();
  const questionQuery = useQuestion(questionId);

  const theme = useTheme();

  // TODO: Handle it better
  if (!questionId) return <ThemedText>you can not view this screen</ThemedText>;

  const ref = useRef<Animated.ScrollView>(null);
  const { mutate: create, isPending, isSuccess } = useCreateAnswerMutation();

  const [answerText, setAnswerText] = useState("");

  const handleSubmit = () => {
    if (answerText.trim().length !== 0) {
      // Remove keyboard from the screen
      Keyboard.dismiss();
      const newAnswer = { question: questionId, text: answerText };
      create(newAnswer, {
        onSuccess: () => {
          router.back();
        },
      });
    }
  };

  return (
    <Page>
      <AppBar title={questionQuery.data?.title} />
      <Animated.ScrollView showsVerticalScrollIndicator={false} ref={ref}>
        <Container>
          <ServerView status={questionQuery.status}>
            {questionQuery.data && (
              <QuestionDetailInfo {...questionQuery.data} />
            )}
          </ServerView>
          {/* Input section */}
          <Animated.View>
            <View style={styles.container}>
              <ThemedText color={theme.colors.secondary} variant="displaySmall">
                {t("write your answer")}
              </ThemedText>
              <TextInput
                theme={{ roundness: 20 }}
                value={answerText}
                onChangeText={(text) => setAnswerText(text)}
                placeholder={t("Answer")}
                style={{ padding: 10 }}
                numberOfLines={6}
                mode="outlined"
                multiline
              />
              {/* Preview */}
              <ThemedText color={theme.colors.secondary} variant="displaySmall">
                {t("Preview")}
              </ThemedText>
              <ThemedText variant="titleMedium">{answerText}</ThemedText>
            </View>
          </Animated.View>
        </Container>
      </Animated.ScrollView>
      <View style={styles.submitContainer}>
        <Button onPress={handleSubmit} mode="contained">
          create
        </Button>
      </View>
      <LoadingDialog visible={isPending} message="creating answer..." />
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    gap: 20,
    marginBottom: height / 1.5,
  },

  submitContainer: {
    ...containerMargins,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default CreateNewAnswerScreen;
