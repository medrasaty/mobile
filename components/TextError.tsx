import { View, ViewProps } from "react-native";
import { HelperText, HelperTextProps } from "react-native-paper";

type TextErrorProps = {
  condition: boolean;
} & Omit<HelperTextProps, "type">;

/**
 * Provide a hidden text when no error message is provided , solves the ui jumping issue when conditionally rendering errors.
 * @param error : error message.
 * @returns
 */
const TextError = ({ condition, ...props }: TextErrorProps) => {
  return (
    <HelperText style={{ opacity: condition ? 1 : 0 }} type="error" {...props}>
      {/* Zero opacity when no error  */}
      {condition ? props.children : "Error"}
    </HelperText>
  );
};

export default TextError;
