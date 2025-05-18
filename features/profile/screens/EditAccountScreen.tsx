import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { AppBar } from "@/features/navigation/components/AppBar";
import { Appbar, IconButton } from "react-native-paper";
import { t } from "i18next";
import { useAuthSession } from "@/features/auth/store";
import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSheetModalRef } from "@/components/Sheet";
import { launchImageLibraryAsync } from "expo-image-picker";
import { containerPaddings } from "@/constants/styels";
import { EditDisplayName, EditEmail, EditBiography, EditPrivacy } from "../components/EditAccountFields";

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
          {/* Background Image */}
          <View style={styles.backgroundContainer}>
            <Image
              style={styles.backgroundImage}
              source={user.profile.background}
              cachePolicy="memory-disk"
            />
            {/* TODO: Implement background image editing */}
          </View>

          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <Image
              style={styles.profilePicture}
              source={user.profile_picture}
              transition={500}
              cachePolicy="memory-disk"
            />
            {/* TODO: Implement profile picture editing */}
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
    alignItems: "center",
    marginTop: 10,
  },
  backgroundContainer: {
    width: "100%",
    position: "relative",
  },
  backgroundImage: {
    height: 140,
    width: "100%",
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  backgroundEditButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  profilePictureContainer: {
    position: "relative",
    marginTop: -50,
  },
  profilePicture: {
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "gray",
    borderRadius: 100,
  },
  profilePictureEditButton: {
    position: "absolute",
    bottom: -5,
    right: -5,
    borderRadius: 20,
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

