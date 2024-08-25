import useAuthClient from "@/hooks/useAuthClient";
import { Answer, Reply } from "@/types/forum.types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function useReplies(answerId: Answer["id"]) {
  const client = useAuthClient();

  const params = {
    answer: answerId,
  };

  const fetchReplies = async (answerId: Answer["id"]): Promise<Reply[]> => {
    const response = await client.get(`/forum/replies/`, { params });
    return response.data.results;
  };

  return useQuery({
    queryKey: ["replies", answerId],
    queryFn: async () => await fetchReplies(answerId),
  });
}
