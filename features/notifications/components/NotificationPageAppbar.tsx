import { useTranslation } from "react-i18next";
import { Appbar } from "react-native-paper";

type NotificationPageAppbarProps = {};

const NotificationPageAppbar = ({}: NotificationPageAppbarProps) => {
  const { t } = useTranslation();

  return <Appbar.Header mode="small"></Appbar.Header>;
};

export default NotificationPageAppbar;
