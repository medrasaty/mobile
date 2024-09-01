import { ThemedText } from "@/components/ThemedText";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import React from "react";
import ContentLoader, {
  IContentLoaderProps,
} from "react-content-loader/native";
import { useTheme } from "react-native-paper";

type LoaderProps = IContentLoaderProps;

export default function Loader({ ...props }: LoaderProps) {
  const theme = useTheme();
  return (
    <ContentLoader
      backgroundColor={theme.colors.surfaceVariant}
      animate={false}
      rtl
      {...props}
    >
      {props.children}
    </ContentLoader>
  );
}
