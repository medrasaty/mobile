import React from 'react';
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
  PictureOptimized as PicturePreview,
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
import useImagePicker from "@/hooks/useImagePicker";
import ImagePickerSheet from "@/features/profile/components/ImagePickerSheet";
import { useSheetRef } from "@/components/Sheet";
import { fileUploadType } from "@/types";

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
  const {
    pickImage,
    fileUpload,
    isLoading: isImagePickerLoading,
    reset,
  } = useImagePicker();
  const sheetRef = useSheetRef();
  const theme = useTheme();

  const handleImageSelect = async (source: "camera" | "library") => {
    const image = await pickImage({}, source);
    if (image) {
      // The existing onImageSelected expects ImagePickerAsset,
      // but useImagePicker returns fileUploadType.
      // We need to decide how to handle this discrepancy.
      // For now, let's assume we adapt the caller or the hook later
      // and pass the uri for preview and the full object for upload.
      // This is a temporary solution and might need revisiting.
      onImageSelected({ uri: image.uri } as ImagePickerAsset);
    }
  };

  const handleUnselect = () => {
    reset();
    onImageUnselected();
  };

  return (
    <>
      <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
        <IconButton
          onPress={() => sheetRef.current?.expand()}
          icon={icon}
          mode="contained-tonal"
          disabled={isImagePickerLoading}
          {...props}
        />
        <ThemedText variant="bodyLarge" style={styles.label}>
          {fileUpload ? t("create_question.edit_picture") : lable}
        </ThemedText>
        {fileUpload && (
          <IconButton
            iconColor={theme.colors.error}
            icon="trash-can-outline"
            onPress={handleUnselect}
            disabled={isImagePickerLoading}
          />
        )}
      </View>
      <ImagePickerSheet
        sheetRef={sheetRef}
        onCameraPress={() => handleImageSelect("camera")}
        onGalleryPress={() => handleImageSelect("library")}
        isLoading={isImagePickerLoading}
      />
    </>
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
    <View>
      <ThemedText variant="titleLarge">###</ThemedText>
      <TextInput theme={{ roundness: INPUT_ROUNDNESS }} mode="outlined" />
    </View>
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
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: "red",
  },
  label: {
    // marginBottom: 8,
  },
});
