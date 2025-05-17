import { StyleSheet, View, ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { Button, IconButton, IconButtonProps, TextProps } from "react-native-paper";
import { ReactNode } from "react";

type EmptyViewProps = {
  /**
   * The message to display when the list is empty.
   */
  message?: string;

  /**
   * Secondary message to display below the main message
   */
  secondaryMessage?: string;

  /**
   * The icon to display when the list is empty.
   */
  icon?: IconButtonProps["icon"];

  /**
   * Size of the icon
   * @default 32
   */
  iconSize?: number;

  /**
   * Custom icon color
   */
  iconColor?: string;

  /**
   * Whether to use full screen mode which takes up all available space
   * @default true
   */
  fullScreen?: boolean;

  /**
   * Props for the main message text component
   */
  messageProps?: TextProps<any>;

  /**
   * Props for the secondary message text component
   */
  secondaryMessageProps?: TextProps<any>;

  /**
   * Custom content to render below the message
   */
  children?: ReactNode;

  /**
   * Action button text
   */
  actionButtonText?: string;

  /**
   * Action button callback
   */
  onActionPress?: () => void;

  /**
   * Padding for the container
   * @default 16
   */
  padding?: number;
} & ViewProps;

/**
 * A versatile empty state component that can be used in both full screen and partial views.
 * Provides customization for icon, messages, and actions.
 */
const EmptyView = ({
  message = "No data available",
  secondaryMessage,
  icon,
  iconSize = 32,
  iconColor,
  fullScreen = true,
  style,
  messageProps,
  secondaryMessageProps,
  children,
  actionButtonText,
  onActionPress,
  padding = 16,
  ...props
}: EmptyViewProps) => {
  return (
    <View 
      style={[
        styles.container, 
        fullScreen ? styles.fullScreen : styles.partialView,
        { padding },
        style
      ]} 
      {...props}
    >
      {icon && (
        <IconButton
          mode="contained-tonal"
          style={styles.icon}
          icon={icon}
          iconColor={iconColor}
          size={iconSize}
        />
      )}
      
      <ThemedText 
        variant="titleMedium" 
        style={styles.message}
        {...messageProps}
      >
        {message.toUpperCase()}
      </ThemedText>
      
      {secondaryMessage && (
        <ThemedText 
          variant="bodyMedium" 
          style={styles.secondaryMessage}
          {...secondaryMessageProps}
        >
          {secondaryMessage}
        </ThemedText>
      )}
      
      {actionButtonText && onActionPress && (
        <Button 
          mode="contained" 
          onPress={onActionPress}
          style={styles.actionButton}
        >
          {actionButtonText}
        </Button>
      )}
      
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreen: {
    flex: 1,
  },
  partialView: {
    minHeight: 120,
  },
  icon: {
    marginBottom: 15,
  },
  message: {
    textAlign: "center",
    marginBottom: 8,
  },
  secondaryMessage: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 16,
  },
  actionButton: {
    marginTop: 8,
  }
});

export default EmptyView;
