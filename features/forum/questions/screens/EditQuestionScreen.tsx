import Page from "@/components/Page";
import { containerMargins, containerPaddings } from "@/constants/styels";
import { ScrollView, ViewProps } from "react-native";
import { Button } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import LoadingDialog from "@/components/LoadingDialog";
import { questionDetail } from "@/lib/routing";
import * as yup from "yup";
import { t } from "i18next";
import { Formik } from "formik";
import { useForumQuestion } from "../queries";
import { Question } from "@/types/forum.types";
import { useUpdateQuestionMutation } from "../mutations";
import * as QF from "@/features/forum/components/question/CreateNewQuestionPageComponents";
import ServerView from "@components/ServerView";
import FullPageLoadingIndicator from "@components/FullPageLoadingIndicator";

const updateQuestionSchema = yup.object().shape({
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

interface EditQuestionScreenProps extends ViewProps {
  questionId: Question["id"];
}

export default function EditQuestionScreen({
  questionId,
  ...props
}: EditQuestionScreenProps) {
  const q = useForumQuestion(questionId);

  console.log(q.data);

  const initialValues = {
    title: q.data?.title,
    text: q.data?.text,
    subject: q.data?.subject,
    picture: q.data?.picture,
    tags: q.data?.tags,
  };

  if (q.isPending) return <FullPageLoadingIndicator />;

  const { mutate: update } = useUpdateQuestionMutation();

  return (
    <Page>
      <Formik
        initialValues={initialValues}
        validationSchema={updateQuestionSchema}
        onSubmit={(values, { setSubmitting }) => {
          // TODO handle form submittion
          update(
            { questionId, data: values },
            {
              onSuccess: (data, variables) => {
                router.replace(
                  questionDetail({ questionId: variables.questionId })
                );
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
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
                  gap: 20,
                  paddingBottom: 30,
                }}
                showsVerticalScrollIndicator={false}
              >
                <>
                  <QF.TitleInput
                    value={values.title}
                    onChangeText={handleChange("title")}
                    errorMessage={errors.title}
                  />
                  <QF.DescriptionInput
                    value={values.text}
                    onChangeText={handleChange("text")}
                    showError={touched.text && errors.text}
                    errorMessage={errors.text}
                  />
                  <ThemedView
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <QF.AddPictureButton
                      onImageSelected={(image) => {
                        setFieldValue("picture", image.uri);
                      }}
                      onImageUnselected={() => {
                        setFieldValue("picture", "");
                      }}
                    />
                    <QF.SubjectInput
                      icon={values.subject ? "circle" : "circle-outline"}
                      lable={t(values?.subject?.name)}
                      subject={values.subject}
                      error={errors.subject}
                      onSelect={(subject) => setFieldValue("subject", subject)}
                    />
                  </ThemedView>
                </>
                <QF.Preview {...values} picture={values.picture} />
              </ScrollView>

              <Button
                style={{ marginBottom: 8, marginTop: 8, ...containerMargins }}
                onPress={() => handleSubmit()}
                mode="contained"
              >
                {t("submit")}
              </Button>
            </Page>
            <LoadingDialog
              visible={isSubmitting}
              message="جاري نشر السؤال..."
            />
          </>
        )}
      </Formik>
    </Page>
  );
}
