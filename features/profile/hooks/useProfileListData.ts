import { useState, useEffect } from "react";
import useProfileQuestions from "./useProfileQuestions";
import { UserProfile } from "../types";
import useProfileAnswers from "./useProfileAnswers";
import { useProfileScreen } from "../contexts/ProfileScreenContext";

export default function useProfileListData() {
  const {
    profile: { username },
  } = useProfileScreen();
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
