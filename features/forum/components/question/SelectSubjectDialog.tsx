import LoadingDialog from "@/components/LoadingDialog";
import RadioTextButton from "@/components/RadioTextButton";
import { ThemedText } from "@/components/ThemedText";
import { translateSubject } from "@/lib/utils";
import { Subject } from "@/types/school.types";
import {
  ActivityIndicator,
  Dialog,
  DialogProps,
  Portal,
} from "react-native-paper";
import useSubjects from "../../hooks/useSubjects";
import { ThemedView } from "@/components/ThemedView";

type BaseSelectSubjecDialogProps = {
  subject: Subject | undefined;
  onSelect: (subject: Subject | undefined) => void;
  onDismiss: DialogProps["onDismiss"];
};

export type SelectSubjectDialogProps = {
  visible: boolean;
} & BaseSelectSubjecDialogProps;

export default function SelectSubjectDialog({
  visible,
  ...props
}: SelectSubjectDialogProps) {
  return (
    <Portal>
      <Dialog dismissable visible={visible} onDismiss={props.onDismiss}>
        <Dialog.Title>قائمة المواد</Dialog.Title>
        <SubjectsList {...props} />
      </Dialog>
    </Portal>
  );
}

export const SubjectsList = ({
  onSelect,
  onDismiss,
  subject: selectedSubject,
}: BaseSelectSubjecDialogProps) => {
  const { data, isLoading, isError } = useSubjects();

  const renderSubject = (subject: Subject) => {
    const handleSelect = () => {
      onSelect(subject as Subject);
      if (onDismiss) onDismiss();
    };

    return (
      <RadioTextButton
        key={subject.id}
        title={translateSubject(subject.name)}
        value={subject.id}
        status={subject.id === selectedSubject?.id ? "checked" : "unchecked"}
        onPress={handleSelect}
      />
    );
  };

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <SubjectsListError />;

  const subjects = data;

  return <Dialog.ScrollArea>{subjects.map(renderSubject)}</Dialog.ScrollArea>;
};

export const SubjectsListError = () => {
  return (
    <ThemedView style={{ justifyContent: "center" }}>
      <ThemedText>solo is error</ThemedText>
    </ThemedView>
  );
};
