import { Container } from "@/components/styled";
import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "@/components/styled";
import QuestionCard from "@/components/QuestionCard";
import { Question } from "@/definitions/forum.types";
import Text from "@/components/styled/Text";

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ flex: 1 }}>
        <QuestionsPage />
      </Container>
    </SafeAreaView>
  );
}

const QuestionsPage = () => {
  return <QuestionsList />;
};

import React from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native";

const QuestionsList = () => {
  const client = useAuthClient();

  const q = useQuery({
    queryKey: ["questions"],
    queryFn: async (): Promise<Question[]> => {
      const response = await client.get("/forum/questions/");
      return response.data;
    },
  });

  if (q.isFetching) return <ActivityIndicator />;

  if (q.isError) return <Text>Error </Text>;

  if (q.data) {
    return (
      <>
        <FlashList
          ListHeaderComponent={<Text variant="displaySmall">الأسئلة</Text>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 60 }}
          data={q.data}
          renderItem={({ item }) => <QuestionCard question={item} />}
          estimatedItemSize={200}
        />
      </>
    );
  }
};
