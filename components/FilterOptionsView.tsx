import { containerPaddings } from "@/constants/styels";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip, ChipProps } from "react-native-paper";

export type FilterOption = {
  label: string;
  value: string;
};

type FilterOptionsViewProps = {
  filterOptions: FilterOption[];
  currentFilter: string;
  container?: boolean;
  onFilterChange: (filter: FilterOption["value"]) => void;
} & ViewProps;

const FilterOptionsView: React.FC<FilterOptionsViewProps> = ({
  filterOptions,
  container = true,
  currentFilter,
  onFilterChange,
  ...props
}) => {
  return (
    <View {...props}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContentContainer,
          container && { ...containerPaddings },
        ]}
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
    marginTop: 8,
    marginBottom: 8,
  },
});

export default FilterOptionsView;
