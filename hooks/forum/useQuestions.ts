import { useQuery } from "@tanstack/react-query";
import useAuthClient from "../useAuthClient";
import { Question } from "@/definitions/forum.types";

export default function useQuestions() {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["questions"],
    queryFn: async (): Promise<Question[]> => {
      const response = await client.get("/forum/questions/");
      return response.data;
    },
  });
}
