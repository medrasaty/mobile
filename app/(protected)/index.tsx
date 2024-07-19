import { Container } from "@/components/styled";
import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "@/components/styled";
import QuestionCard from "@/components/QuestionCard";
import { Question } from "@/definitions/forum.types";
import Text from "@/components/styled/Text";
// import { Text } from "react-native";

export default function HomePage() {
  return (
    <SafeAreaView>
      <Container>
        <QuestionsPage />
      </Container>
    </SafeAreaView>
  );
}

const QuestionsPage = () => {
  return (
    <>
      <QuestionsList />
    </>
  );
};

import React from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native";
import { Divider } from "react-native-paper";
import useQuestions from "@/hooks/forum/useQuestions";

const QuestionsList = () => {
  const q = useQuestions();

  if (q.isFetching) return <ActivityIndicator />;

  if (q.isError) return <Text>Error </Text>;

  if (q.data) {
    return (
      <>
        <FlashList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Divider}
          data={q.data}
          renderItem={({ item }) => <QuestionCard question={item} />}
          estimatedItemSize={200}
          overScrollMode="never"
        />
      </>
    );
  }
};
