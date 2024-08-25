import React, { useContext, createContext } from "react";
import { Answer } from "@/types/forum.types";

type AnswerContextType = {
  answer: Answer;
};

const AnswerContext = createContext<AnswerContextType>({});

export function AnswerProvider({
  answer,
  children,
}: { answer: Answer } & React.PropsWithChildren) {
  return (
    <AnswerContext.Provider value={{ answer }}>
      {children}
    </AnswerContext.Provider>
  );
}

export function useAnswer(): Answer {
  const { answer } = useContext(AnswerContext);

  if (process.env.NODE_ENV !== "production") {
    if (!answer) {
      throw new Error("useAnswer must be used withing a <AnswerProvider>");
    }
  }
  return answer;
}
