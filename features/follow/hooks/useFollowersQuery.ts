import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getAllFollowers } from "../requests";

export default function useFollowerQuery() {
  const client = useAuthClient();
  return useQuery({
    queryKey: ["followers"],
    queryFn: async () => getAllFollowers(client),
  });
}
