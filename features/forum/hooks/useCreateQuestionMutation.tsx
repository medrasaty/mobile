import useAuthClient from "@/hooks/useAuthClient";
import { fileUploadType } from "@/types";
import { Question } from "@/types/forum.types";
import { Subject } from "@/types/school.types";
import {
  useQueryClient,
  useMutation,
  infiniteQueryOptions,
} from "@tanstack/react-query";
import { Axios, AxiosError } from "axios";
import { useNavigation } from "expo-router";
import { transformDates } from "../utils";

export type QuestionData = {
  title: string;
  text: string;
  subject: Subject["id"];
  picture: fileUploadType | null | undefine;
  tags: string[];
};

export function validateQuestionData({ title, text, subject }: QuestionData) {
  const titleMaxLength = 150;

  if (title.trim().length > titleMaxLength || title.trim().length === 0) {
    throw new Error("يجب ان يكون العنوان اقل من " + titleMaxLength);
  }

  if (text.trim().length === 0) {
    throw new Error("لا يمكنك ترك حقل الوصف فارغاًً");
  }

  if (!subject) {
    throw new Error("يجب تحديد المادة");
  }
}

export default function useCreateQuestionMutation() {
  /**
   * handle creating and validating question data
   */

  const client = useAuthClient();
  const qc = useQueryClient();
  const navigation = useNavigation();

  const mutation = useMutation({
    mutationKey: ["create_question"],
    mutationFn: async (data: QuestionData) => createQuestion(client, data),
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data: Question) => {
      // Set question to the catch
      qc.setQueryData(["question", data.id], data);
    },
  });

  return {
    validate: validateQuestionData,
    ...mutation,
  };
}

async function createQuestion(client: Axios, data: QuestionData) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("text", data.text);
  formData.append("subject", data.subject);
  if (data?.picture) formData.append("picture", data?.picture);

  const response = await client.post("/forum/questions/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: (data, headers) => {
      return formData;
    },
  });

  return transformDates(response.data);
}
