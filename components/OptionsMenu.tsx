import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useRoundedTheme from "@/hooks/useRoundedTheme";
import useVisible from "@/hooks/useVisible";
import React from "react";
import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuProps,
} from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type OptionType = {
  id: string | number;
  title: string;
  icon?: IconSource;
};

type OptionsMenuProps = {
  options: OptionType[];
  onOptionPressed: (option: OptionType) => void;
  iconButtonOptions?: Omit<IconButtonProps, "icon">;
} & Omit<Omit<Omit<Omit<MenuProps, "children">, "anchor">, "visible">, "theme">;

const OptionsMenu = ({
  options,
  onOptionPressed,
  iconButtonOptions,
  ...props
}: OptionsMenuProps) => {
  /**
   * Display a list of options in a menu
   */

  const menuItems = options.map((option) => {
    return (
      <Menu.Item
        title={option.title}
        leadingIcon={option.icon}
        onPress={() => onOptionPressed(option)}
        key={option.id}
      />
    );
  });

  const { visible, show, hide } = useVisible(false);

  return (
    <Menu
      anchor={
        <IconButton
          icon={"dots-vertical"}
          onPress={show}
          {...iconButtonOptions}
        />
      }
      visible={visible}
      onDismiss={hide}
      {...props}
    >
      {menuItems}
    </Menu>
  );
};

export default OptionsMenu;
