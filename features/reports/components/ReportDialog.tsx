import {
  Dialog,
  DialogProps,
  Divider,
  Button,
  Portal,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import RadioButtonGroup, {
  RadioButtonGroupChoiceType,
} from "@/components/RadioButtonGroup";
import { useMemo, useState } from "react";
import { t } from "i18next";
import useReportTypes from "../queries";
import LoadingIndicator from "@/components/LoadingIndicator";
import { containerMargins } from "@/constants/styels";
import useSendReport from "../mutations";

type ReportDialogProps = {
  contentTypeId: number;
  objectId: string | number;
} & Omit<DialogProps, "children">;

const ReportDialog = ({
  contentTypeId,
  objectId,
  ...props
}: ReportDialogProps) => {
  const [currentChoice, setCurrentChoice] = useState("spam"); // Default value
  const reportTypes = useReportTypes(contentTypeId);
  const { mutate: sendReport, isPending } = useSendReport();

  const choices = useMemo((): RadioButtonGroupChoiceType[] | [] => {
    return reportTypes?.data?.map((type) => ({
      value: type.id,
      title: type.name,
    }));
  }, [reportTypes.data]);

  const handleConfirm = () => {
    sendReport("solo");
    if (props.onDismiss) props.onDismiss();
  };

  return (
    <Portal>
      <Dialog {...props}>
        <Dialog.Icon icon={"dots-circle"} size={40} />
        <View style={{ alignItems: "center" }}>
          <Dialog.Title>{"Report"}</Dialog.Title>
        </View>
        <Dialog.Content style={styles.contentContainer}>
          <Divider bold />
          {reportTypes.isPending ? (
            <LoadingIndicator />
          ) : (
            <RadioButtonGroup
              onChoicePress={(choice) => setCurrentChoice(choice.value)}
              currentValue={currentChoice}
              choices={choices}
              contentContainerStyle={{ gap: 10 }}
            />
          )}
          <Divider bold />
        </Dialog.Content>
        <View style={styles.actionsContainer}>
          <Button onPress={handleConfirm} mode="contained">
            {t("report")}
          </Button>
          <Button onPress={props.onDismiss} mode="text">
            {t("cancel")}
          </Button>
        </View>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    maxHeight: 180,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  actionsContainer: {
    ...containerMargins,
    marginBottom: 14,
    gap: 10,
  },
});

export default ReportDialog;
