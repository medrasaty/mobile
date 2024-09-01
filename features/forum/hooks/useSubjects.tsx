import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function useSubjects() {
  const client = useAuthClient();
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await client.get(`/subjects/`);
      return response.data.results;
    },
  });
}
