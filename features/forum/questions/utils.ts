import { genFileUploadFromPath } from "@/lib/utils";
import { QuestionData } from "./mutations";
import { questionSchemaType } from "./schemas";

export function parseQuestionFormData(data: questionSchemaType) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("text", data.text);
  formData.append("subject", data.subject.id);

  if (data?.picture) {
    const picturefile = genFileUploadFromPath(data.picture);
    // @ts-ignore
    formData.append("picture", picturefile);
  }

  return formData;
}
