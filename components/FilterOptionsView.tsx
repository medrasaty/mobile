import { containerPaddings } from "@/constants/styels";
import { NotificationType } from "@/types/notifications.type";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip, ChipProps } from "react-native-paper";
import { ThemedView } from "./ThemedView";

export type FilterOption = {
  label: string;
  value: string | NotificationType;
};

type FilterOptionsViewProps = {
  filterOptions: FilterOption[];
  currentFilter: string | NotificationType;
  onFilterChange: (filter: string | NotificationType) => void;
} & ViewProps;

const FilterOptionsView: React.FC<FilterOptionsViewProps> = ({
  filterOptions,
  currentFilter,
  onFilterChange,
  ...props
}) => {
  return (
    <View {...props}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {filterOptions.map((option) => (
          // @ts-ignore
          <FilterChip
            label={option.label}
            key={option.value}
            selected={currentFilter === option.value}
            onPress={() => onFilterChange(option.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export type FilterChip = {
  label: string;
} & ChipProps;

export const FilterChip = ({ label, selected, ...props }: FilterChip) => {
  return (
    <Chip
      // rounded chips
      theme={{ roundness: 16 }}
      style={{ padding: 1 }}
      selected={selected}
      compact
      showSelectedOverlay
      {...props}
    >
      {label}
    </Chip>
  );
};

const styles = StyleSheet.create({
  scrollContentContainer: {
    flex: 1,
    gap: 5,
    paddingBottom: 4,
    ...containerPaddings,
  },
});

export default FilterOptionsView;
