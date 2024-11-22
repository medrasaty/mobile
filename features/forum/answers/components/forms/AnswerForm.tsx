import { answerSchema, answerSchemaType } from "@forum/answers/schema";
import { FormikConfig } from "formik";
import { ThemedText } from "@components/ThemedText";
import Animated from "react-native-reanimated";
import {
  Button,
  HelperText,
  Portal,
  TextInput,
  useTheme,
} from "react-native-paper";
import { t } from "i18next";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { containerMargins, containerPaddings } from "@/constants/styels";
import LoadingDialog from "@components/LoadingDialog";
import { Formik } from "formik";
import { AddPictureButton } from "@forum/components/question/CreateNewQuestionPageComponents";
import FastImage from "react-native-fast-image";
import useForumPictureStyle from "@forum/hooks";

type AnswerFormProps = {
  edit?: boolean;
} & Omit<FormikConfig<answerSchemaType>, "validationSchema">;

const AnswerForm = ({ edit, ...props }: AnswerFormProps) => {
  const theme = useTheme();
  const pictureStyle = useForumPictureStyle();
  return (
    <Formik validationSchema={answerSchema} {...props}>
      {({
        handleChange,
        values,
        errors,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
      }) => (
        <>
          {/* Input section */}
          <Animated.View>
            {/* answer text */}
            <View style={styles.container}>
              <ThemedText color={theme.colors.secondary} variant="displaySmall">
                {edit ? t("edit_your_answer") : t("wirte_your_answer")}
              </ThemedText>
              <View style={{ gap: 10 }}>
                <TextInput
                  theme={{ roundness: 20 }}
                  value={values.text}
                  onChangeText={handleChange("text")}
                  placeholder={t("your_answer")}
                  style={{ paddingTop: 8, paddingBottom: 8, marginTop: 10 }}
                  mode="outlined"
                  numberOfLines={4}
                  multiline
                />
                {errors.text && touched.text && (
                  <HelperText type="error">{errors.text}</HelperText>
                )}
                {/* answer picture */}
                <AddPictureButton
                  onImageSelected={(image) =>
                    setFieldValue("picture", image.uri)
                  }
                  onImageUnselected={() => setFieldValue("picture", "")}
                />
              </View>

              {/* Preview */}
              <View>
                <ThemedText
                  style={{ marginTop: 15 }}
                  color={theme.colors.secondary}
                  variant="displaySmall"
                >
                  {t("Preview")}
                </ThemedText>
                <View style={{ gap: 10 }}>
                  <ThemedText variant="titleMedium">{values.text}</ThemedText>
                  <FastImage
                    style={pictureStyle}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: values.picture }}
                  />
                </View>
              </View>

              <View style={styles.submitContainer}>
                <Portal>
                  <View
                    style={{
                      padding: 4,
                      ...containerPaddings,
                      backgroundColor: theme.colors.surface,
                      flex: 1,
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                    }}
                  >
                    <Button
                      style={{ width: "100%" }}
                      onPress={() => handleSubmit()}
                      mode="contained"
                    >
                      {edit ? t("edit") : t("submit")}
                    </Button>
                  </View>
                </Portal>
              </View>
            </View>
          </Animated.View>
          <LoadingDialog visible={isSubmitting} message="sending..." />
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 40,
  },

  submitContainer: {
    ...containerMargins,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default AnswerForm;
