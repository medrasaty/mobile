import { ThemedText } from "@/components/ThemedText";
import useSchoolIdParam from "../hooks";
import { useSchool } from "../queries";
import Page from "@/components/Page";
import { DetailSchool, School } from "../types";
import { View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import Avatar from "@/components/Avatar";
import { StyleSheet } from "react-native";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Surface, useTheme } from "react-native-paper";
import { useMemo } from "react";
import { containerMargins, debugStyle } from "@/constants/styels";
import Row from "@/components/Row";
import ReputationInfo from "@/components/ReputationInfo";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "@/components/styled";
import { AppBar } from "@/features/navigation/components/AppBar";
import { ScreenListV2 } from "@/components/ScreenFlatList";

const SchoolDetailScreen = () => {
  /**
   * What kind of infromation this page should display ?
   * - school detail:
   *  - name
   *  - logo
   *  - background
   *  - address
   *  - city
   *  - biography
   *  - total_reputation
   *  - total_reach
   *  - total_views
   *  - members count
   *
   * - memebers list:
   *  - list students and teachers in standard card ? later decide
   */

  const schoolId = useSchoolIdParam();

  if (!schoolId) return <ThemedText>Invalid school</ThemedText>;

  const q = useSchool(schoolId);

  const renderHeader = () => {
    if (q.isPending) {
      return <LoadingIndicator />;
    }

    if (q.data) {
      return <Header school={q.data} />;
    }
  };

  return (
    <Page>
      <ScreenListV2
        renderItem={() => <ThemedText>solo</ThemedText>}
        ListHeaderComponent={renderHeader}
        data={[]}
        isPending={q.isPending}
        isError={q.isError}
        onRetry={q.refetch}
      />
    </Page>
  );
};

const Header = ({ school }: { school: DetailSchool }) => {
  return (
    <>
      <AppBar title="medrasaty" />
      <BackgroundImage url={school.background} />
      <View style={{ alignItems: "center" }}>
        <SchoolInfo school={school} />
      </View>
      <ReputationInfo
        style={{ ...containerMargins, marginTop: 10 }}
        reputation={school.total_reputation}
        views={10}
        reach={90}
      />
    </>
  );
};

export const BackgroundImage = ({
  url,
  ...props
}: { url: School["background"] } & ViewProps) => {
  return (
    <View style={{ alignItems: "center" }} {...props}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: url }}
        style={styles.backgroundImage}
      />
    </View>
  );
};

export const SchoolLogo = ({
  logo,
  style,
  ...props
}: { logo: School["logo"] } & ViewProps) => {
  const avatarSize = useMemo(() => 140, []);
  const theme = useTheme();
  return (
    <Surface elevation={5} style={{ borderRadius: 100 }} {...props}>
      <Avatar
        style={{
          borderWidth: 3,
          borderColor: theme.colors.background,
          shadowColor: theme.colors.shadow,
        }}
        size={avatarSize}
        url={logo}
      />
    </Surface>
  );
};

export const SchoolInfo = ({
  school,
  ...props
}: { school: DetailSchool } & ViewProps) => {
  const theme = useTheme();
  return (
    <View style={{ alignItems: "center", marginTop: -40 }} {...props}>
      <SchoolLogo logo={school.logo} />
      <Row gap={10} alignItems="center">
        <ThemedText variant="displaySmall">{school.name}</ThemedText>
        <Ionicons color="black" name="school-sharp" size={22} />
      </Row>
      <ThemedText color="gray" variant="titleSmall">
        {school.biography}
      </ThemedText>
      <ThemedText variant="bodySmall">{`${school.city}, ${school.address}, عدد الأعضاء ${school.members_count}`}</ThemedText>
    </View>
  );
};

const DEFAULT_SCHOOL_BACKGROUND_HEIGHT = 160;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "96%",
    height: DEFAULT_SCHOOL_BACKGROUND_HEIGHT,
    borderRadius: 18,
  },

  backgroundGradiant: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },
});

export default SchoolDetailScreen;
