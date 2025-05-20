import React from "react";
import { View, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { Sheet } from "@/components/Sheet";
import { t } from "i18next";

export interface ImagePickerSheetProps {
  /**
   * Reference to the sheet component.
   */
  sheetRef: React.RefObject<any>;

  /**
   * Title to display at the top of the sheet.
   */
  title?: string;

  /**
   * Function called when camera option is selected.
   */
  onCameraPress: () => void;

  /**
   * Function called when gallery option is selected.
   */
  onGalleryPress: () => void;

  /**
   * Whether the sheet actions are in a loading state.
   */
  isLoading?: boolean;
}

/**
 * A sheet component that displays camera and gallery options for image picking
 */
const ImagePickerSheet: React.FC<ImagePickerSheetProps> = ({
  sheetRef,
  title = t("Select Image Source"),
  onCameraPress,
  onGalleryPress,
  isLoading = false,
}) => {
  const handleCameraPress = () => {
    sheetRef.current?.close();
    onCameraPress();
  };

  const handleGalleryPress = () => {
    sheetRef.current?.close();
    onGalleryPress();
  };

  return (
    <Sheet ref={sheetRef}>
      <View style={styles.container}>
        {title && (
          <ThemedText variant="titleMedium" style={styles.title}>
            {title}
          </ThemedText>
        )}

        <List.Item
          title={t("Take Photo")}
          left={(props) => <List.Icon {...props} icon="camera" />}
          onPress={handleCameraPress}
          disabled={isLoading}
          style={styles.listItem}
        />

        <List.Item
          title={t("Choose from Gallery")}
          left={(props) => <List.Icon {...props} icon="image" />}
          onPress={handleGalleryPress}
          disabled={isLoading}
          style={styles.listItem}
        />
      </View>
    </Sheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  listItem: {
    borderRadius: 8,
  },
});

export default ImagePickerSheet;

