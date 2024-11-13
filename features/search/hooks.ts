import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

export default function useSearchQuery() {
  const { q: searchQuery } = useLocalSearchParams<{ q: string }>();
  return searchQuery ?? "";
}
