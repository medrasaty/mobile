import { t } from "i18next";
import * as yup from "yup";

export const answerSchema = yup.object().shape({
  text: yup.string().required(t("required")),
  picture: yup.string(),
  question: yup.string().uuid().required(),
});

export type answerSchemaType = yup.InferType<typeof answerSchema>;
