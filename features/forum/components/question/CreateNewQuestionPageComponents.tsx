import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ViewProps } from "react-native";
import {
  TextInput,
  TextInputProps,
  HelperText,
  IconButton,
  IconButtonProps,
  Divider,
  useTheme,
} from "react-native-paper";
import {
  ImagePickerAsset,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";

import {
  Title as TitlePreview,
  Description as DescriptionPreview,
  Picture as PicturePreview,
  SubjectInfo,
} from "@/features/forum/components/question/detail/QuestionDetailInfo";
import { Subject } from "@/types/school.types";
import useVisible from "@/hooks/useVisible";
import { useState } from "react";

export type BaseCreateQuestionInputProps = {
  onChangeText: TextInputProps["onChangeText"];
  value: TextInputProps["value"];
  title?: string;
} & ViewProps;

export const TitleInput = ({
  value,
  onChangeText,
  title = "العنوان",
  ...props
}: BaseCreateQuestionInputProps) => {
  return (
    <ThemedView style={{ gap: 2 }} {...props}>
      <ThemedText variant="titleLarge">{title}</ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        theme={{ roundness: 16 }}
      />
      <HelperText type="info">كن محدداً </HelperText>
    </ThemedView>
  );
};

export const DescriptionInput = ({
  value,
  onChangeText,
  title = "التفاصيل",
  ...props
}: BaseCreateQuestionInputProps) => {
  return (
    <ThemedView style={{ gap: 2 }} {...props}>
      <ThemedText variant="titleLarge">{title}</ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        theme={{ roundness: 16 }}
        style={{ paddingTop: 6, paddingBottom: 6 }}
        multiline
        numberOfLines={6}
        mode="outlined"
      />
    </ThemedView>
  );
};

export type BaseIconButtonProps = {
  lable?: string; // custom lable to display beside icon button
  icon?: IconButtonProps["icon"];
  mode?: IconButtonProps["mode"];
  size?: IconButtonProps["size"];
};

export type SelectSubjectButtonProps = {
  onPress: IconButtonProps["onPress"];
} & BaseIconButtonProps;

export type AddPictureProps = {
  onImageSelected: (image: ImagePickerAsset) => void;
  onImageUnselected: () => void;
} & BaseIconButtonProps;

export const AddPictureButton = ({
  onImageSelected,
  onImageUnselected,
  icon = "attachment",
  lable = "اضافة صورة",
  ...props
}: AddPictureProps) => {
  /**
   * Launch ImageLIbraryAsync and let user choose a picture,
   */

  const [selected, setSelected] = useState(false);

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
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
      <ThemedText>{selected ? "تعديل الصورة" : "اضاقة صورة"}</ThemedText>
      {selected && (
        <IconButton icon="trash-can-outline" onPress={handleUnselect} />
      )}
    </ThemedView>
  );
};

export const SelectSubjectButton = ({
  onPress,
  icon = "circle-outline",
  lable = "اختر المادة",
  ...props
}: SelectSubjectButtonProps) => {
  return (
    <ThemedView style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      <IconButton
        onPress={onPress}
        icon={icon}
        mode="contained-tonal"
        {...props}
      />
      <ThemedText>{lable}</ThemedText>
    </ThemedView>
  );
};

export const HashTags = () => {
  // TODO:
  return (
    <ThemedView>
      <ThemedText variant="titleLarge">###</ThemedText>
      <TextInput theme={{ roundness: 16 }} mode="outlined" />
    </ThemedView>
  );
};

export type PreviewProps = {
  title: string;
  subject?: Subject;
  description: string;
  image?: string; // uri
} & ViewProps;

export const Preview = ({
  title,
  description,
  subject,
  image,
  style,
  ...props
}: PreviewProps) => {
  /**
   * Show a preview for question , title, description , and image if any.
   *
   */

  const { visible, show, hide } = useVisible(true); // preview visible by default

  const handlePreviewToggle = () => {
    visible ? hide() : show();
  };

  return (
    <ThemedView style={[style]}>
      <PreviewToggle visible={visible} onTogglePressed={handlePreviewToggle} />
      {visible && (
        <>
          <Divider />
          <PreviewContent
            title={title ?? ""}
            subject={subject}
            description={description ?? ""}
            image={image}
          />
        </>
      )}
    </ThemedView>
  );
};

export const PreviewContent = ({
  style,
  title,
  subject,
  description,
  image,
  ...props
}: PreviewProps) => {
  return (
    <ThemedView style={[style, { flex: 1, gap: 8 }]} {...props}>
      <TitlePreview title={title} />
      {subject && <SubjectInfo subject={subject} />}
      <DescriptionPreview description={description} />
      <PicturePreview image={image} />
    </ThemedView>
  );
};

export const PreviewToggle = ({
  title = "مراجعة",
  onTogglePressed,
  visible,
}: {
  title?: string;
  onTogglePressed: () => void;
  visible: boolean;
}) => {
  const theme = useTheme();
  return (
    <ThemedView style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
      <ThemedText variant="titleLarge">{title}</ThemedText>
      <IconButton
        onPress={onTogglePressed}
        iconColor={theme.colors.onSurface}
        icon={visible ? "arrow-down" : "arrow-left"}
        size={18}
      />
    </ThemedView>
  );
};
