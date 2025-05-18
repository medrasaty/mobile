/**
 * EditFieldSheet is a reusable component that provides a modal sheet interface
 * for editing a field. It supports various field types such as text, email,
 * textarea, and switch, and allows customization of its behavior and appearance.
 *
 * It is designed to work with both `Sheet` and `SheetModal` components,
 * dynamically rendering the appropriate one based on the provided `sheetRef`.
 *
 *
 * Props:
 * - `sheetRef` (any): A reference to the sheet component. This is used to control
 *   the modal's visibility and behavior.
 * - `title` (string): The title of the sheet, displayed as the field's label.
 * - `value` (string | boolean): The current value of the field. It can be a string
 *   for text-based fields or a boolean for switch fields.
 * - `onChange` (function): A callback function triggered when the field's value changes.
 *   It receives the new value as its argument.
 * - `type` (optional, "text" | "email" | "textarea" | "switch"): Specifies the type of
 *   the field. Defaults to "text".
 * - `description` (optional, string): An optional description for the field, displayed
 *   below the field editor.
 * - `snapPoints` (optional, string[]): Optional snap points for the sheet layout.
 *   Defaults to dynamic sizing.
 * - `multiline` (optional, boolean): Indicates whether the field supports multiple lines
 *   of input. Defaults to `false`.
 * - `keyboardType` (optional, "default" | "email-address" | "numeric" | "phone-pad"):
 *   Specifies the type of keyboard to display for text input fields. Defaults to "default".
 *
 * Example Usage:
 * ```tsx
 * <EditFieldSheet
 *   sheetRef={sheetRef}
 *   title="Email Address"
 *   value={email}
 *   onChange={(newValue) => setEmail(newValue)}
 *   type="email"
 *   description="Please enter a valid email address."
 * />
 * ```
 *
 * This component ensures a consistent and user-friendly interface for editing fields
 * within a modal sheet, making it suitable for various use cases in React Native apps.
 */
import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Button, TextInput, Switch } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Sheet, { SheetModal } from "@/components/Sheet";
import { t } from "i18next";
import LoadingDialog from "@components/LoadingDialog";

// Update the isSheetModalRef function to be more robust
const isSheetModalRef = (ref: any): boolean => {
  // Check if it's a valid ref first
  if (!ref || !ref.current) return false;

  // Check if it has methods typical of SheetModal
  return (
    typeof ref.current.present === "function" &&
    typeof ref.current.dismiss === "function"
  );
};

/**
 * Props for the EditFieldSheet component.
 */
interface EditFieldSheetProps<V> {
  /**
   * Reference to the sheet component.
   */
  sheetRef: any;

  /**
   * The title of the sheet.
   */
  title: string;

  /**
   * The current value of the field, which can be a string or a boolean.
   */
  value: V;

  /**
   * Callback function triggered when the value changes.
   * @param value - The new value of the field.
   */
  onChange: (value: V) => void;

  /**
   * callback function triggered when the value is saved.
   * @param value - The value to be saved.
   */
  onSave: (value: V) => void;

  /**
   * Whether the sheet is in a saving state.
   */
  isSaving?: boolean;
  /**
   * The type of the field, which can be one of the following:
   * - 'text'
   * - 'email'
   * - 'textarea'
   * - 'switch'
   */
  type?: "text" | "email" | "textarea" | "switch";

  /**
   * Optional description for the field.
   */
  description?: string;

  /**
   * Optional snap points for the sheet layout.
   * @default{dynamicSizing}
   */
  snapPoints?: string[];

  /**
   * Whether the field supports multiple lines of input.
   */
  multiline?: boolean;

  /**
   * The type of keyboard to display, which can be one of the following:
   * - 'default'
   * - 'email-address'
   * - 'numeric'
   * - 'phone-pad'
   */
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const EditFieldSheet: React.FC<EditFieldSheetProps<any>> = ({
  sheetRef,
  title,
  value,
  onChange,
  type = "text",
  description,
  onSave,
  isSaving = false,
  multiline = false,
  keyboardType = "default",
}) => {
  // Different UI based on the field type
  const renderFieldEditor = () => {
    const renderTextInput = (additionalProps = {}) => (
      <TextInput
        mode="outlined"
        label={title}
        value={value as string}
        disabled={isSaving}
        onChangeText={onChange}
        style={styles.textInput}
        {...additionalProps}
      />
    );

    const renderDescription = () =>
      description && (
        <ThemedText variant="bodySmall" style={styles.description}>
          {description}
        </ThemedText>
      );

    switch (type) {
      case "switch":
        return (
          <>
            <ThemedView style={styles.switchContainer}>
              <ThemedText>{title}</ThemedText>
              <Switch value={value as boolean} onValueChange={onChange} />
            </ThemedView>
            {renderDescription()}
          </>
        );

      case "textarea":
        return renderTextInput({
          multiline: true,
          style: [styles.textInput, styles.textareaInput],
        });

      case "email":
        return renderTextInput({ keyboardType: "email-address" });

      case "text":
      default:
        return renderTextInput({ multiline, keyboardType });
    }
  };

  const handleSave = () => {
    onSave(value);
  };

  const renderContent = () => (
    <View style={styles.content}>
      <ThemedText variant="titleMedium">{t(`Edit ${title}`)}</ThemedText>

      {renderFieldEditor()}

      <Button
        loading={isSaving}
        disabled={isSaving}
        mode="contained"
        onPress={handleSave}
        style={styles.saveButton}
      >
        {t("Save")}
      </Button>
      <LoadingDialog
        visible={isSaving}
        message={t("update_loading", { field: title })}
      />
    </View>
  );

  // Render either SheetModal or Sheet based on the ref type
  return isSheetModalRef(sheetRef) ? (
    <SheetModal ref={sheetRef}>{renderContent()}</SheetModal>
  ) : (
    <Sheet ref={sheetRef}>{renderContent()}</Sheet>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 20,
  },
  textInput: {
    marginTop: 10,
  },
  textareaInput: {
    minHeight: 120,
  },
  saveButton: {
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  description: {
    opacity: 0.7,
    marginTop: 4,
  },
});

export default EditFieldSheet;

