import { useState, useEffect } from "react";
import { useForumQuestions } from "../forum/queries";

export default function useUserQuestions(username: string, params: any = {}) {
  return useForumQuestions({
    ...params,
    owner: username,
  });
}
