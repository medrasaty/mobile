import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text, Dialog, Portal } from "react-native-paper";

export default function LoadingDialog({
  message = "يتم معالجة البيانات ...",

  visible,
}: {
  message?: string;
  visible: boolean;
}) {
  return (
    <View>
      <Portal>
        <Dialog
          style={{ borderRadius: 4 }}
          visible={visible}
          dismissable={false}
        >
          <Dialog.Content>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <ActivityIndicator size={"large"} />
              <Text>{message}</Text>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}
