import Page from "@/components/Page";
import {
  containerMargins,
  containerPaddings,
  debugStyle,
} from "@/constants/styels";
import { ScrollView } from "react-native";
import * as CreateQuestion from "@/features/forum/components/question/CreateNewQuestionPageComponents";
import { Button } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import LoadingDialog from "@/components/LoadingDialog";
import { t } from "i18next";
import { Formik, FormikConfig } from "formik";
import { questionSchema, questionSchemaType } from "@forum/questions/schemas";

type QuestionFormProps = {
  edit?: boolean;
} & Omit<FormikConfig<questionSchemaType>, "validationSchema">;

export default function QuestionForm({
  edit = false,
  ...props
}: QuestionFormProps) {
  return (
    <Formik validationSchema={questionSchema} {...props}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        isSubmitting,
      }) => (
        <>
          <Page>
            <ScrollView
              contentContainerStyle={{
                ...containerPaddings,
                paddingBottom: 30,
              }}
              showsVerticalScrollIndicator={false}
            >
              <>
                <CreateQuestion.TitleInput
                  value={values.title}
                  onChangeText={handleChange("title")}
                  showError={touched.title && errors.title}
                  error={errors.title}
                />
                <CreateQuestion.DescriptionInput
                  value={values.text}
                  onChangeText={handleChange("text")}
                  showError={touched.text && errors.text}
                  error={errors.text}
                />
                <ThemedView
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <CreateQuestion.AddPictureButton
                    onImageSelected={(image) => {
                      setFieldValue("picture", image.uri);
                    }}
                    onImageUnselected={() => {
                      setFieldValue("picture", "");
                    }}
                  />
                  <CreateQuestion.SubjectInput
                    icon={values.subject ? "circle" : "circle-outline"}
                    lable={t(values?.subject?.name)}
                    subject={values.subject}
                    error={errors.subject}
                    onSelect={(subject) => setFieldValue("subject", subject)}
                  />
                </ThemedView>
              </>
              <CreateQuestion.Preview
                {...values}
                picture={values.picture}
                description={values.text}
                style={{ marginTop: 20 }}
              />
            </ScrollView>

            <Button
              style={{ marginBottom: 8, marginTop: 8, ...containerMargins }}
              onPress={() => handleSubmit()}
              mode="contained"
            >
              {edit ? t("edit") : t("submit")}
            </Button>
          </Page>
          <LoadingDialog visible={isSubmitting} message={t("sending")} />
        </>
      )}
    </Formik>
  );
}
