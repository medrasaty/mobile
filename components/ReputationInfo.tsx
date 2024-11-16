import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import Row from "./Row";
import { TouchableRipple, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";

type ReputationInfoProps = {
  reputation: number;
  reach: number;
  views: number;
  compact?: boolean;
} & ViewProps;

const ReputationInfo = ({
  reputation,
  reach,
  views,
  style,
  compact = false,
  ...props
}: ReputationInfoProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  if (compact) {
    // Compact version
    return (
      <TouchableOpacity>
        <Row style={{ gap: 10 }}>
          <DotInfo color="gold" value={reputation} />
          <DotInfo color="silver" value={reach} />
          <DotInfo color={"#33ff22"} value={views} />
        </Row>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[
        style,
        styles.container,
        {
          borderColor: theme.colors.surfaceVariant,
        },
      ]}
      {...props}
    >
      <Row style={styles.rowContainer}>
        <StatInfo
          valueColor="gold"
          label={t("Reputation")}
          value={reputation}
        />
        <StatInfo label={t("Reach")} value={reach} />
        <StatInfo label={t("Total_views")} value={views} />
      </Row>
    </TouchableOpacity>
  );
};

export const StatInfo = ({
  label,
  value,
  valueColor,
  labelColor,
}: {
  label: string;
  value: number;
  valueColor?: string;
  labelColor?: string;
}) => {
  const theme = useTheme();
  return (
    <ThemedView style={{ flex: 1, alignItems: "center" }}>
      <ThemedText color={valueColor} variant="titleLarge">
        {value}
      </ThemedText>
      <ThemedText color={labelColor ?? "gray"} variant="labelMedium">
        {label}
      </ThemedText>
    </ThemedView>
  );
};

type DotInfoProps = {
  color: string;
  value: string | number;
};

export const DotInfo = ({ color, value }: DotInfoProps) => {
  return (
    <Row alignItems="center" style={{ gap: 2 }}>
      <ThemedText variant="labelSmall">{value}</ThemedText>
      <MaterialIcons color={color} size={6} name="circle" />
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 2,
    gap: 10,
  },
  rowContainer: {
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default ReputationInfo;
