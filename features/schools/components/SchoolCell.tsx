import { ThemedText } from "@/components/ThemedText";
import { Pressable, View } from "react-native";
import { School } from "../types";
import Avatar from "@/components/Avatar";
import Row from "@/components/Row";
import { Surface } from "react-native-paper";
import { router } from "expo-router";

type SchoolCellProps = {
  school: School;
};

const SchoolCell = ({ school }: SchoolCellProps) => {
  const goToSchool = () => {
    router.push(`/schools/${school.id}`);
  };

  return (
    <Pressable onPress={goToSchool}>
      <Surface style={[{ borderRadius: 100, gap: 10, margin: 6 }]}>
        <Row alignItems="center" style={{ gap: 10 }}>
          <Avatar url={school.logo} size={120} />
          <View>
            <SchoolName name={school.name} />
            <ThemedText color="gray" variant="labelSmall">
              {school.address + school.city}
            </ThemedText>
          </View>
        </Row>
      </Surface>
    </Pressable>
  );
};

export const SchoolName = ({ name }: { name: string }) => {
  return (
    <View>
      <ThemedText bold variant="bodyLarge">
        {name}
      </ThemedText>
    </View>
  );
};

export default SchoolCell;
