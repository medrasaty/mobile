import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, ViewProps } from "react-native";
import {
  TextInput,
  TextInputProps,
  IconButton,
  IconButtonProps,
  Divider,
  useTheme,
} from "react-native-paper";
import { ImagePickerAsset, launchImageLibraryAsync, MediaType } from "expo-image-picker";

import {
  Title as TitlePreview,
  Description as DescriptionPreview,
  Picture as PicturePreview,
  SubjectInfo,
} from "@/features/forum/components/question/detail/QuestionDetailInfo";
import { Subject } from "@/types/school.types";
import { useVisibleV2 } from "@/hooks/useVisible";
import { useState } from "react";
import SelectSubjectDialog from "./SelectSubjectDialog";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import TextError from "@components/TextError";
import { debugStyle } from "@/constants/styels";

export type BaseCreateQuestionInputProps = {
  onChangeText: TextInputProps["onChangeText"];
  value: TextInputProps["value"];
  title?: string;
  showError?: boolean;
  error?: string;
} & ViewProps;

const INPUT_ROUNDNESS = 16;

export const TitleInput = ({
  value,
  onChangeText,
  title = t("create_question.title"),
  showError = false,
  error,
  ...props
}: BaseCreateQuestionInputProps) => {
  return (
    <View style={styles.container} {...props}>
      <ThemedText variant="titleLarge">{title}</ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        theme={{ roundness: INPUT_ROUNDNESS }}
      />
      <TextError condition={showError}>{error}</TextError>
    </View>
  );
};

export const DescriptionInput = ({
  value,
  onChangeText,
  title = t("create_question.description"),
  showError,
  error,
  ...props
}: BaseCreateQuestionInputProps) => {
  return (
    <View style={styles.container} {...props}>
      <ThemedText variant="titleLarge" style={styles.label}>
        {title}
      </ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        theme={{ roundness: INPUT_ROUNDNESS }}
        style={{ paddingTop: 25, paddingBottom: 25 }}
        multiline
        numberOfLines={6}
        mode="outlined"
      />
      <TextError condition={showError}>{error}</TextError>
    </View>
  );
};

export type BaseIconButtonProps = {
  lable?: string; // custom lable to display beside icon button
  icon?: IconButtonProps["icon"];
  mode?: IconButtonProps["mode"];
  size?: IconButtonProps["size"];
};

export type SelectSubjectButtonProps = {
  subject: Subject | undefined;
  onSelect: (subject: Subject) => void;
  error?: string;
} & BaseIconButtonProps;

export type AddPictureProps = {
  onImageSelected: (image: ImagePickerAsset) => void;
  onImageUnselected: () => void;
} & BaseIconButtonProps;

export const AddPictureButton = ({
  onImageSelected,
  onImageUnselected,
  icon = "attachment",
  lable = t("create_question.add_picture"),
  ...props
}: AddPictureProps) => {
  /**
   * Launch ImageLIbraryAsync and let user choose a picture,
   */

  const [selected, setSelected] = useState(false);
  const theme = useTheme();

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 2],
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelected(true);
      onImageSelected(result.assets[0]); // list of images by default, evne if you want a single image.
    }
  };

  const handleUnselect = () => {
    onImageUnselected();
    setSelected(false);
  };

  return (
    <ThemedView style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      <IconButton
        onPress={pickImage}
        icon={icon}
        mode="contained-tonal"
        {...props}
      />
      <ThemedText variant="bodyLarge" style={styles.label}>
        {selected ? t("create_question.edit_picture") : lable}
      </ThemedText>
      {selected && (
        <IconButton
          iconColor={theme.colors.error}
          icon="trash-can-outline"
          onPress={handleUnselect}
        />
      )}
    </ThemedView>
  );
};

export const SubjectInput = ({
  icon = "circle-outline",
  lable,
  onSelect,
  subject,
  error,
  ...props
}: SelectSubjectButtonProps) => {
  lable = lable?.length === 0 ? t("create_question.choose_subject") : lable;

  const [visible, show, hide] = useVisibleV2(false);
  const theme = useTheme();
  return (
    <ThemedView style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      <IconButton
        onPress={show}
        icon={icon}
        mode="contained-tonal"
        {...props}
      />
      <View style={{ gap: 3 }}>
        <ThemedText color={error && theme.colors.error} style={styles.label}>
          {t("create_question.add_subject")}
        </ThemedText>
      </View>
      <SelectSubjectDialog
        subject={subject}
        visible={visible}
        onDismiss={hide}
        onSelect={onSelect}
      />
    </ThemedView>
  );
};

export const HashTags = () => {
  // TODO:
  return (
    <ThemedView>
      <ThemedText variant="titleLarge">###</ThemedText>
      <TextInput theme={{ roundness: INPUT_ROUNDNESS }} mode="outlined" />
    </ThemedView>
  );
};

export type PreviewProps = {
  title: string;
  subject?: Subject;
  description: string;
  picture?: string; // uri
} & ViewProps;

export const Preview = ({
  title,
  description,
  subject,
  picture,
  style,
  ...props
}: PreviewProps) => {
  /**
   * Show a preview for question before creation.
   */

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[style, { gap: 10 }]} {...props}>
      <ThemedText variant="titleLarge" style={styles.label}>
        {t("create_question.preview")}
      </ThemedText>
      <Divider bold />
      <PreviewContent
        title={title ?? ""}
        subject={subject}
        description={description ?? ""}
        picture={picture}
      />
    </View>
  );
};

export const PreviewContent = ({
  style,
  title,
  subject,
  description,
  picture,
  ...props
}: PreviewProps) => {
  return (
    <View style={[style, { flex: 1, gap: 8, marginTop: 12 }]} {...props}>
      <TitlePreview title={title} />
      {subject && <SubjectInfo subject={subject} />}
      <DescriptionPreview description={description} />
      {picture && <PicturePreview image={picture} />}
    </View>
  );
};

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  label: {
    color: "lightred",
  },
});
