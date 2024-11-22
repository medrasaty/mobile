import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Answer } from "./types";

export default function useAnswerIdParams() {
  const { answerId } = useLocalSearchParams<{ answerId: Answer["id"] }>();

  return answerId;
}
