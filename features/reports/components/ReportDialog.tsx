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
import LoadingDialog from "@/components/LoadingDialog";

export type BaseReportProps = {
  contentTypeId: number;
  objectId: string | number;
};

type ReportDialogProps = BaseReportProps & Omit<DialogProps, "children">;

const ReportDialog = ({
  contentTypeId,
  objectId,
  ...props
}: ReportDialogProps) => {
  const [currentTypeChoice, setCurrentTypeChoice] = useState<string | null>(
    null
  ); // Default value
  const reportTypes = useReportTypes(contentTypeId);
  const { mutate: sendReport, isPending: isSending } = useSendReport();

  const choices = useMemo((): RadioButtonGroupChoiceType[] | [] => {
    return reportTypes?.data?.map((type) => ({
      value: type.id,
      title: type.name,
    }));
  }, [reportTypes.data]);

  const handleConfirm = () => {
    if (currentTypeChoice) {
      sendReport({
        object_id: objectId,
        content_type: contentTypeId,
        report_type: currentTypeChoice,
      });

      setCurrentTypeChoice(null);

      if (props.onDismiss) props.onDismiss();
    }
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
              onChoicePress={(choice) => setCurrentTypeChoice(choice.value)}
              currentValue={currentTypeChoice}
              choices={choices}
              contentContainerStyle={{ gap: 10 }}
            />
          )}
          <Divider bold />
        </Dialog.Content>
        <View style={styles.actionsContainer}>
          <Button
            disabled={currentTypeChoice === null}
            onPress={handleConfirm}
            mode="contained"
          >
            {t("report")}
          </Button>
          <Button onPress={props.onDismiss} mode="text">
            {t("cancel")}
          </Button>
        </View>
      </Dialog>
      <LoadingDialog visible={isSending} message={t("Sending_report...")} />
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
