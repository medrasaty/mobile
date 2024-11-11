import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useRoundedTheme from "@/hooks/useRoundedTheme";
import useVisible from "@/hooks/useVisible";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import React from "react";
import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuItemProps,
  MenuProps,
} from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type OptionType = MenuItemProps;

type OptionsMenuProps = {
  options: OptionType[];
  iconButtonOptions?: Omit<IconButtonProps, "icon">;
} & Omit<Omit<Omit<Omit<MenuProps, "children">, "anchor">, "visible">, "theme">;

const OptionsMenu = ({
  options,
  iconButtonOptions,
  ...props
}: OptionsMenuProps) => {
  /**
   * Display a list of options in a menu
   */

  const menuItems = options.map((option, index) => {
    return <Menu.Item {...option} key={index} />;
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
