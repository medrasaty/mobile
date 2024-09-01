import { ListRenderItem, Pressable } from "react-native";
import { Dialog, DialogProps } from "react-native-paper";
import { ThemedText } from "./ThemedText";
import { debugStyle } from "@/constants/styels";

type Item = {
  [PropName: string]: any;
};

interface ListDialogProps extends DialogProps {
  renderItem: ({ item }: { item: Item }) => React.ReactElement | null;
  data: Item[];
  title?: string; // dialog title
  children?: any;
}

export default function ListDialog({
  data,
  title,
  renderItem,
  children = null,
  ...props
}: ListDialogProps) {
  return (
    <Dialog {...props}>
      {title && <Dialog.Title>{title}</Dialog.Title>}
      <Dialog.ScrollArea>
        {data.map((item) => {
          return renderItem({ item });
        })}
      </Dialog.ScrollArea>
      {children}
    </Dialog>
  );
}
