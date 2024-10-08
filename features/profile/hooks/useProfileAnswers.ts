import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getUserAnswers } from "../requests";

export default function useProfileAnswers(username: BaseUser["username"]) {
  const client = useAuthClient();
  return useQuery({
    queryKey: ["answers", username],
    queryFn: async () => await getUserAnswers(client, username),
  });
}
