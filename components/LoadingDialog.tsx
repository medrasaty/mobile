import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text, Dialog, Portal } from "react-native-paper";

export default function LoadingDialog({
  message = "جاري التحميل...",
  visible,
}: {
  message?: string;
  visible: boolean;
}) {
  /**
   * Return a Dialog with a message and  Loading indicator
   * default message is "يتم معالجة البيانات ..."
   * @param message?: string
   * @param visible:  boolean (required)
   */
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
