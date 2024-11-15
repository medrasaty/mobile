import { ThemedText } from "@/components/ThemedText";
import useSchoolIdParam from "../hooks";
import { useSchoolDetail } from "../queries";
import Page from "@/components/Page";
import { ScreenFlatListV2 } from "@/components/ScreenFlatList";
import Header from "../components/SchoolDetailHeader";
import SchoolMemberCell from "../components/SchoolMemberCell";
import ScreenPage from "@/components/Screen";
import { debugStyle } from "@/constants/styels";
import TopReputation from "../components/TopReputation";
import SmallButton from "@/components/SmallButton";
import TopViews from "../components/TopViews";
import { ScrollView, View } from "react-native";
import { useMemo } from "react";
import { router } from "expo-router";
import { Button, useTheme } from "react-native-paper";
import { Container } from "@/components/styled";

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
   * - memebers list:
   *  - list students and teachers in standard card ? later decide
   */

  const schoolId = useSchoolIdParam();

  if (!schoolId) return <ThemedText>Invalid school</ThemedText>;

  const {
    isPending,
    isError,
    refetch,
    isRefetching,
    schoolData,
    membersData,
    schoolQuery,
    membersQuery,
  } = useSchoolDetail(schoolId);

  const topReputationUsers = useMemo(() => {
    return membersData.sort((a, b) => {
      return b.reputation - a.reputation;
    });
  }, [membersQuery]);

  const topViewsUsers = useMemo(() => {
    return membersData.sort((a, b) => {
      return b.total_views - a.total_views;
    });
  }, [membersQuery]);

  const renderHeader = () => {
    if (schoolData) return <Header school={schoolQuery.data} />;
    return null;
  };

  const goToMembers = () => {
    router.push(`/schools/${schoolId}/members`);
  };
  const theme = useTheme();

  return (
    <ScreenPage onRetry={refetch} isPending={isPending} isError={isError}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Header school={schoolData} />
        <View style={{ marginTop: 30, gap: 30 }}>
          <TopReputation members={topReputationUsers} />
          <TopViews users={topViewsUsers} />
        </View>
        <Container style={{ marginTop: 40 }}>
          <Button
            style={{ borderColor: theme.colors.surfaceVariant }}
            mode="outlined"
            onPress={goToMembers}
          >
            All
          </Button>
        </Container>
      </ScrollView>
    </ScreenPage>
  );
};

export default SchoolDetailScreen;
