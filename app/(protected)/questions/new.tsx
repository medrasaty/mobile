import Page from "@/components/Page";
import { AppBar } from "@/features/navigation/components/AppBar";
import useVisible from "@/hooks/useVisible";
import { Subject } from "@/types/school.types";
import { containerMargins, containerPaddings } from "@/constants/styels";
import { useState } from "react";
import { ScrollView } from "react-native";
import * as CreateQuestion from "@/features/forum/components/question/CreateNewQuestionPageComponents";
import { Button, Dialog } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import SelectSubjectDialog from "@/features/forum/components/question/SelectSubjectDialog";
import { translateSubject } from "@/lib/utils";
import useCreateQuestionMutation, {
  QuestionData,
} from "@/features/forum/hooks/useCreateQuestionMutation";
import { ThemedText } from "@/components/ThemedText";
import useImageAssetState from "@/hooks/useImageAssetState";
import { router } from "expo-router";
import LoadingDialog from "@/components/LoadingDialog";

export default function NewQuestionPage() {
  const {
    visible: subjectDialogVisible,
    show: showSubjectDialog,
    hide: hideSubjectDialog,
  } = useVisible(false);

  const { validate, mutate, isPending } = useCreateQuestionMutation();

  const [subject, setSubject] = useState<Subject>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useImageAssetState();
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = () => {
    const data = {
      title: title,
      text: description,
      subject: subject?.id,
      picture: picture,
      tags: tags,
    };

    try {
      validate(data);
      mutate(data, {
        onSuccess: (data, variables) => {
          // replace route to clear all form state and start fresh
          // do not use 'push' or 'navigate'
          router.replace(`/questions/details/${data.id}`);
        },
      });
    } catch (error) {
      alert(error?.message);
    }
  };

  return (
    <>
      <AppBar title="سؤال جديد" />
      <Page>
        <ScrollView
          contentContainerStyle={{
            ...containerPaddings,
            gap: 20,
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
        >
          <CreateQuestion.TitleInput
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <CreateQuestion.DescriptionInput
            value={description}
            onChangeText={(text) => setDescription(text)}
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
                setPicture(image);
              }}
              onImageUnselected={() => {
                setPicture(null);
              }}
            />
            <CreateQuestion.SelectSubjectButton
              icon={subject ? "circle" : "circle-outline"}
              lable={subject ? translateSubject(subject.name) : "اختر المادة"}
              onPress={showSubjectDialog}
            />
          </ThemedView>
          <CreateQuestion.Preview
            title={title}
            subject={subject}
            description={description}
            image={picture?.uri}
          />
        </ScrollView>
        <Button
          style={{ marginBottom: 8, marginTop: 8, ...containerMargins }}
          onPress={handleSubmit}
          mode="contained"
        >
          نشر
        </Button>
      </Page>
      <SelectSubjectDialog
        subject={subject}
        visible={subjectDialogVisible}
        onDismiss={hideSubjectDialog}
        onSelect={(subject) => setSubject(subject)}
      />
      <LoadingDialog visible={isPending} message="جاري نشر السؤال..." />
    </>
  );
}

export const ValidationErrorDialog = ({
  visible,
  errorMessage,
}: {
  visible: boolean;
  errorMessage: string;
}) => {
  // TODO: complete implementaion
  return (
    <Dialog dismissable visible={visible}>
      <Dialog.Content>
        <ThemedText>{errorMessage}</ThemedText>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => {}}>تم</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
