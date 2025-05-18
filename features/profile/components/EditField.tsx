import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider, useTheme } from "react-native-paper";

interface EditFieldProps {
  /**
   * Label for the field
   */
  label: string;
  /**
     Value to be displayed in the fields
     @type {string}
  */
  value: string | undefined;
  /**
   * Function to be called when the field is pressed
   */
  onPress: () => void;

  /**
   * Add divider at the bottom of the field
   */
  divider?: boolean;
}

const EditField: React.FC<EditFieldProps> = ({
  label,
  value,
  onPress,
  divider = true,
}) => {
  const theme = useTheme();

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <ThemedText>{label}</ThemedText>
          <View style={styles.valueContainer}>
            <ThemedText numberOfLines={1} style={styles.value}>
              {value === "" || value === undefined ? "_" : value}
            </ThemedText>
            <MaterialCommunityIcons
              name="pencil"
              size={18}
              color={theme.colors.onSurface}
            />
          </View>
        </View>
      </TouchableOpacity>
      {divider && <Divider />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 19,
    paddingBottom: 19,
    marginBottom: 10,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  value: {
    opacity: 0.7,
    marginRight: 12,
    textAlign: "right",
    flex: 1,
  },
});

export default EditField;

