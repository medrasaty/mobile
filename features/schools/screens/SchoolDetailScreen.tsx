import { ThemedText } from "@/components/ThemedText";
import useSchoolIdParam from "../hooks";
import { useSchoolDetail } from "../queries";
import Page from "@/components/Page";
import { ScreenFlatListV2 } from "@/components/ScreenFlatList";
import Header from "../components/SchoolDetailHeader";
import SchoolMemberCell from "../components/SchoolMemberCell";

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

  const renderHeader = () => {
    if (schoolData) return <Header school={schoolQuery.data} />;
    return null;
  };

  return (
    <Page>
      <ScreenFlatListV2
        renderItem={({ item }) => <SchoolMemberCell member={item} />}
        ListHeaderComponent={renderHeader}
        numColumns={3}
        data={membersData}
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
      />
    </Page>
  );
};

export default SchoolDetailScreen;
