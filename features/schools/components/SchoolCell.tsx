import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { School } from "../types";
import Avatar from "@/components/Avatar";
import { Surface, useTheme } from "react-native-paper";
import { goToSchool } from "@/lib/routing";
import SchoolName from "./SchoolName";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";

export const SCHOOL_CELL_HEIGHT = 80;

type SchoolCellProps = {
  school: School;
};

const SchoolCell = ({ school }: SchoolCellProps) => {
  const theme = useTheme();
  
  return (
    <Pressable onPress={() => goToSchool(school.id)}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.contentContainer}>
            <Avatar url={school.logo} size={48} />
            <View style={styles.textContainer}>
              <SchoolName
                lableProps={{ variant: "titleMedium" }}
                name={school.name}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: DEFAULT_CONTAINER_SPACING,
    height: SCHOOL_CELL_HEIGHT,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textContainer: {
    justifyContent: "center",
  },
});

export default SchoolCell;
