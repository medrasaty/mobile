import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { AppBar } from "@/features/navigation/components/AppBar";
import { t } from "i18next";
import { useAuthSession } from "@/features/auth/store";
import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { containerPaddings } from "@/constants/styels";
import {
  EditDisplayName,
  EditEmail,
  EditBiography,
  EditPrivacy,
  EditProfilePicture,
  EditBackgroundImage,
} from "../components/EditAccountFields";

const EditAccountScreen: React.FC = () => {
  const user = useAuthSession((state) => state.session?.user);
  if (!user) return null;

  return (
    <Page>
      <AppBar divider title={t("Edit Account")} backAction />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeaderContainer}>
          {/* Background Image and Profile Picture */}
          <View style={styles.imageContainer}>
            <EditBackgroundImage />
            <EditProfilePicture />
          </View>

          <ThemedText variant="titleMedium" style={styles.sectionTitle}>
            {t("Account Information")}
          </ThemedText>
        </View>

        {/* Editable fields */}
        <EditDisplayName />
        <EditEmail />
        <EditBiography />
        <EditPrivacy />
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    ...containerPaddings,
    paddingBottom: 40,
  },
  profileHeaderContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  divider: {
    width: "100%",
    marginBottom: 16,
  },
  errorText: {
    marginTop: 20,
    textAlign: "center",
    color: "red",
  },
});

export default EditAccountScreen;
