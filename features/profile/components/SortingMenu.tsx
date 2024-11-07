import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { Menu } from "react-native-paper";
import { SortingOption } from "../types.types";
import { useState } from "react";

interface SortingMenuProps {
  options: SortingOption<any>[];
  onSelect: (option: SortingOption<any>) => void;
}

const SortingMenu = ({ onSelect, options, ...props }: SortingMenuProps) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleSelect = (option: SortingOption<any>) => {
    onSelect(option);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<SortingIcon onClick={openMenu} />}
      theme={{ roundness: 20 }}
      {...props}
    >
      {options.map((option) => (
        <Menu.Item
          key={option.key}
          onPress={() => handleSelect(option)}
          title={option.label}
        />
      ))}
    </Menu>
  );
};

type OrderingIconProps = {
  onClick: () => void;
};

export const SortingIcon = ({ onClick, ...props }: OrderingIconProps) => {
  const theme = useTheme();
  return (
    <Ionicons
      onPress={onClick}
      name="filter-outline"
      size={24}
      color={theme.colors.onSurface}
    />
  );
};

export default SortingMenu;
