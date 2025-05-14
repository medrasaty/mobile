import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

export interface ErrorViewProps {
  error?: Error | unknown;
  onRetry?: () => void;
}

/**
 * ErrorView - A component to display error states with retry functionality
 * 
 * @param {ErrorViewProps} props - Component props
 * @returns {React.ReactElement} A component displaying an error message with retry option
 */
const ErrorView: React.FC<ErrorViewProps> = ({ error, onRetry }) => {
  const theme = useTheme();
  const errorMessage = error instanceof Error ? error.message : 'Something went wrong';

  return (
    <View style={styles.container}>
      <Ionicons 
        name="alert-circle-outline" 
        size={48} 
        color={theme.colors.error} 
      />
      <ThemedText 
        style={styles.errorText} 
        variant="bodyLarge"
      >
        {errorMessage}
      </ThemedText>
      {onRetry && (
        <Button 
          mode="contained" 
          onPress={onRetry} 
          style={styles.retryButton}
        >
          Try Again
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 16,
  },
  retryButton: {
    marginTop: 16,
  },
});

export default ErrorView;
