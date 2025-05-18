import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({ label, value }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>{label}</ThemedText>
      <ThemedText numberOfLines={1} style={styles.value}>
        {value}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  value: {
    opacity: 0.7,
    marginRight: 4,
    textAlign: 'right',
    flex: 1,
  },
});

export default ReadOnlyField; 