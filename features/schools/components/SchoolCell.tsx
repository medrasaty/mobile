import { Pressable, View } from "react-native";
import { School } from "../types";
import Avatar from "@/components/Avatar";
import { Surface, useTheme } from "react-native-paper";
import { goToSchool } from "@/lib/routing";
import SchoolName from "./SchoolName";

type SchoolCellProps = {
  school: School;
};

const SchoolCell = ({ school }: SchoolCellProps) => {
  const theme = useTheme();
  return (
    <Pressable onPress={() => goToSchool(school.id)}>
      <Surface
        style={{
          margin: 10,
          borderRadius: 18,
          alignItems: "center",
          height: 200,
        }}
      >
        <View style={{ alignItems: "center", margin: 8, gap: 10 }}>
          <Avatar url={school.logo} size={120} />
          <View>
            {/* School name */}
            <SchoolName
              lableProps={{ variant: "titleMedium" }}
              name={school.name}
            />
          </View>
        </View>
      </Surface>
    </Pressable>
  );
};

export default SchoolCell;
