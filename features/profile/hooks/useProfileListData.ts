import { useState, useEffect } from "react";
import useProfileQuestions from "./useProfileQuestions";
import { UserProfile } from "../types";
import useProfileAnswers from "./useProfileAnswers";

export default function useProfileListData(username: UserProfile["username"]) {
  const questionQuery = useProfileQuestions(username);
  const answersQuery = useProfileAnswers(username);

  const onRefresh = () => {
    questionQuery.refetch();
    answersQuery.refetch();
  };

  return {
    questionQuery,
    answersQuery,
    onRefresh,
  };
}
