import { ThemedText } from "@/components/ThemedText";
import useSchoolIdParam from "../hooks";
import { useSchool } from "../queries";
import Page from "@/components/Page";
import { School } from "../types";
import { View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import Avatar from "@/components/Avatar";
import { StyleSheet } from "react-native";
import { ScreenListV2, ScreenListV3 } from "@/components/ScreenFlatList";

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

  return (
    <Page>
      <ScreenListV3
        ListHeaderComponent={() => <Header school={q.data} />}
        q={q}
        renderItem={() => null}
      />
    </Page>
  );
};

const Header = ({ school }: { school: School }) => {
  return (
    <View>
      <BackgroundImage url={school.background} />
      <SchoolLogo logo={school.logo} />
      <SchoolInfo school={school} />
    </View>
  );
};

export const BackgroundImage = ({
  url,
  ...props
}: { url: School["background"] } & ViewProps) => {
  return (
    <View {...props}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{ uri: url }}
        style={styles.backgroundImage}
      />
      <linearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={styles.backgroundGradiant}
      />
    </View>
  );
};

export const SchoolLogo = ({
  logo,
  ...props
}: { logo: School["logo"] } & ViewProps) => {
  return (
    <View {...props}>
      <Avatar url={logo} />
    </View>
  );
};

export const SchoolInfo = ({
  school,
  ...props
}: { school: School } & ViewProps) => {
  return (
    <View {...props}>
      <ThemedText>SchoolInfo</ThemedText>
    </View>
  );
};

const DEFAULT_SCHOOL_BACKGROUND_HEIGHT = 250;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: DEFAULT_SCHOOL_BACKGROUND_HEIGHT,
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
