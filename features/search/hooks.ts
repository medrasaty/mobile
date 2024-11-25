import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

export default function useSearchQuery() {
  const { q: searchQuery } = useLocalSearchParams<{ q: string }>();
  const setSearchQuery = (text: string) => {
    router.setParams({
      q: text,
    });
  };
  return { query: searchQuery ?? "", setSearchQuery };
}
