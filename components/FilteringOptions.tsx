import { orderingOptionType } from "@/types";
import React from "react";
import { ScrollView } from "react-native";
import { Chip } from "react-native-paper";

type FilteringOptionsProps = {
  onSelect: (id: orderingOptionType["id"]) => void;
  options: orderingOptionType[];
};

const FilteringOptions = ({ onSelect, options }: FilteringOptionsProps) => {
  /**
      Display a list of options in a horizontal list

    @method
    - onSelect: (id: orderingOptionType["id"]) => void

    @param
    - onSelect: (id: orderingOptionType["id"]) => void
    - options: orderingOptionType[]

    */
  const padding = 15;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      contentContainerStyle={{
        paddingBottom: padding,
        paddingTop: padding,
      }}
    >
      {options.map((item) => (
        <Chip
          key={item.id}
          mode="outlined"
          style={{
            marginStart: 3,
            marginEnd: 3,
          }}
          selected={item.selected}
          icon={item.icon}
          onPress={() => onSelect(item.id)}
        >
          {item.label}
        </Chip>
      ))}
    </ScrollView>
  );
};

export default FilteringOptions;
