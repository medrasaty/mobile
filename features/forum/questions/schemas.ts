import * as yup from "yup";
import { t } from "i18next";

export const questionSchema = yup.object().shape({
  title: yup.string().required(t("title must not be empty")),
  text: yup
    .string()
    .min(10, t("description must be more than 10 characters"))
    .required(t("description must not be empty")),
  subject: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
      catagory: yup.string().required(),
    })
    .required(t("Subject is required")),
  picture: yup.string(),
  tags: yup.array(),
});

export type questionSchemaType = yup.InferType<typeof questionSchema>;
