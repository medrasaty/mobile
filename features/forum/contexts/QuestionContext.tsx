import React, { useContext, createContext } from "react";
import { DetailQuestion } from "@/types/forum.types";

type QuestionContextType = {
  question: DetailQuestion | undefined;
};

const QuestionContext = createContext<QuestionContextType>({
  question: undefined,
});

export function QuestionProvider({
  question,
  children,
}: { question: DetailQuestion } & React.PropsWithChildren) {
  return (
    <QuestionContext.Provider value={{ question: question }}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useContextQuestion(): QuestionContextType["question"] {
  const { question } = useContext(QuestionContext);

  if (process.env.NODE_ENV !== "production") {
    if (!question) {
      throw new Error("useQuestion must be used withing a <QuestionProvider>");
    }
  }
  return question;
}
