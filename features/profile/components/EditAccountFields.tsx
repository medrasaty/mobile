import { ViewProps } from "react-native";
import View from "@components/styled/View";
import EditFieldSheet from "./EditFieldSheet";
import { useSheetRef } from "@components/Sheet";
import { t } from "i18next";
import { useAuthSession } from "@features/auth/store";
import { useState } from "react";
import EditField from "./EditField";
import { useUpdateUserProfileMutation } from "../mutations";
import { launchImageLibraryAsync } from "expo-image-picker";
import useImageAssetState from "@/hooks/useImageAssetState";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { debugStyle } from "@/constants/styels";

type EditFieldProps = ViewProps & {};

/**
 * Component for editing the user's display name
 */
const EditDisplayName = ({ ...props }: EditFieldProps) => {
  const user = useAuthSession((state) => state.session?.user);
  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const sheetRef = useSheetRef();

  const { mutate: update, isPending } = useUpdateUserProfileMutation(
    user?.pk || ""
  );

  const handleUpdate = async () => {
    update(
      { display_name: displayName },
      {
        onSuccess: () => {
          sheetRef.current?.close();
        },
        onError: (error) => {
          console.error("Error updating display name:", error);
        },
      }
    );
  };

  return (
    <View {...props}>
      <EditField
        label={t("Display Name")}
        value={user?.display_name}
        onPress={() => sheetRef.current?.expand()}
      />
      <EditFieldSheet
        sheetRef={sheetRef}
        title={t("Display Name")}
        value={displayName}
        onChange={setDisplayName}
        isSaving={isPending}
        onSave={handleUpdate}
        type="text"
      />
    </View>
  );
};

/**
 * Component for editing the user's email address
 */
const EditEmail = ({ ...props }: EditFieldProps) => {
  const user = useAuthSession((state) => state.session?.user);
  const [email, setEmail] = useState(user?.email || "");
  const sheetRef = useSheetRef();

  const { mutate: update, isPending } = useUpdateUserProfileMutation(
    user?.pk || ""
  );

  const handleUpdate = async () => {
    update(
      { email },
      {
        onSuccess: () => {
          sheetRef.current?.close();
        },
        onError: (error) => {
          console.error("Error updating email:", error);
        },
      }
    );
  };

  return (
    <View {...props}>
      <EditField
        label={t("Email")}
        value={user?.email}
        onPress={() => sheetRef.current?.expand()}
      />
      <EditFieldSheet
        sheetRef={sheetRef}
        title={t("Email")}
        value={email}
        onChange={setEmail}
        isSaving={isPending}
        onSave={handleUpdate}
        type="email"
        keyboardType="email-address"
      />
    </View>
  );
};

/**
 * Component for editing the user's biography
 */
const EditBiography = ({ ...props }: EditFieldProps) => {
  const user = useAuthSession((state) => state.session?.user);
  const [biography, setBiography] = useState(user?.profile?.biography || "");
  const sheetRef = useSheetRef();

  const { mutate: update, isPending } = useUpdateUserProfileMutation(
    user?.pk || ""
  );

  const handleUpdate = async () => {
    update(
      {
        profile: {
          biography,
        },
      },
      {
        onSuccess: () => {
          sheetRef.current?.close();
        },
        onError: (error) => {
          console.error("Error updating biography:", error);
        },
      }
    );
  };

  return (
    <View {...props}>
      <EditField
        label={t("Biography")}
        value={user?.profile?.biography || t("No biography")}
        onPress={() => sheetRef.current?.expand()}
      />
      <EditFieldSheet
        sheetRef={sheetRef}
        title={t("Biography")}
        value={biography}
        onChange={setBiography}
        isSaving={isPending}
        onSave={handleUpdate}
        type="textarea"
        multiline={true}
        description={t("Tell others about yourself")}
      />
    </View>
  );
};

/**
 * Component for editing the user's privacy settings
 */
const EditPrivacy = ({ ...props }: EditFieldProps) => {
  const user = useAuthSession((state) => state.session?.user);
  const [isPrivate, setIsPrivate] = useState(
    user?.profile?.is_private || false
  );
  const sheetRef = useSheetRef();

  const { mutate: update, isPending } = useUpdateUserProfileMutation(
    user?.pk || ""
  );

  const handleUpdate = async () => {
    update(
      {
        profile: {
          is_private: isPrivate,
        },
      },
      {
        onSuccess: () => {
          sheetRef.current?.close();
        },
        onError: (error) => {
          console.error("Error updating privacy settings:", error);
        },
      }
    );
  };

  return (
    <View {...props}>
      <EditField
        label={t("Privacy")}
        value={isPrivate ? t("Private") : t("Public")}
        onPress={() => sheetRef.current?.expand()}
      />
      <EditFieldSheet
        sheetRef={sheetRef}
        title={t("Privacy")}
        value={isPrivate}
        onChange={setIsPrivate}
        isSaving={isPending}
        onSave={handleUpdate}
        type="switch"
        description={t(
          "When your profile is private, only approved followers can see your posts and activity"
        )}
      />
    </View>
  );
};

/**
 * Component for editing the user's profile picture
 */
const EditProfilePicture = ({ ...props }: EditFieldProps) => {
  const user = useAuthSession((state) => state.session?.user);
  const [imageAsset, setImageAsset] = useImageAssetState();
  const { mutate: update, isPending } = useUpdateUserProfileMutation(
    user?.pk || ""
  );

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImageAsset(result.assets[0]);
        handleUpdate(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting profile picture:", error);
    }
  };
  const theme = useTheme();

  const handleUpdate = async (uri: string) => {
    if (!imageAsset) return;

    update(
      { profile_picture: uri },
      {
        onSuccess: () => {
          console.log("Profile picture updated successfully");
        },
        onError: (error) => {
          console.error("Error updating profile picture:", error);
        },
      }
    );
  };

  return (
    <View {...props} style={styles.profilePictureContainer}>
      <View style={styles.profileRow}>
        <Image
          style={styles.profilePicture}
          source={user?.profile_picture}
          transition={500}
          cachePolicy="memory-disk"
        />
        <IconButton
          icon="camera"
          mode="contained"
          size={24}
          onPress={handleSelectImage}
          disabled={isPending}
          style={[
            styles.profilePictureEditButton,
            { backgroundColor: theme.colors.secondaryContainer },
          ]}
          iconColor="#fff"
          containerColor="rgba(0, 0, 0, 0.5)"
        />
      </View>
      <ThemedText style={styles.editLabel}>
        {t("Edit Profile Picture")}
      </ThemedText>
    </View>
  );
};

/**
 * Component for editing the user's background image
 */
const EditBackgroundImage = ({ ...props }: EditFieldProps) => {
  const user = useAuthSession((state) => state.session?.user);
  const theme = useTheme();
  const [imageAsset, setImageAsset] = useImageAssetState();
  const { mutate: update, isPending } = useUpdateUserProfileMutation(
    user?.pk || ""
  );

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImageAsset(result.assets[0]);
        handleUpdate(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting background image:", error);
    }
  };

  const handleUpdate = async (uri: string) => {
    if (!imageAsset) return;

    update(
      {
        profile: {
          background: uri,
        },
      },
      {
        onSuccess: () => {
          console.log("Background image updated successfully");
        },
        onError: (error) => {
          console.error("Error updating background image:", error);
        },
      }
    );
  };

  return (
    <View {...props} style={styles.backgroundContainer}>
      <Image
        style={styles.backgroundImage}
        source={user?.profile.background}
        cachePolicy="memory-disk"
      />
      <View style={styles.backgroundEditButton}>
        <IconButton
          icon="camera"
          mode="contained"
          size={25}
          style={{ backgroundColor: theme.colors.secondaryContainer }}
          onPress={handleSelectImage}
          disabled={isPending}
          iconColor="#fff"
          containerColor="rgba(0, 0, 0, 0.5)"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePictureContainer: {
    position: "relative",
    alignItems: "center",
    marginVertical: 0,
    marginTop: -50,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  profileRow: {
    flexDirection: "row",
    borderRadius: 100,
    alignItems: "center",
    gap: 10,
  },
  profilePicture: {
    position: "relative",
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "gray",
  },
  profilePictureEditButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 20,
  },

  backgroundContainer: {
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  backgroundImage: {
    height: 140,
    width: "99%",
    backgroundColor: "#333",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
  },
  backgroundEditButton: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: 10,
    right: 10,
  },
  editLabel: {
    opacity: 0.7,
  },
});

export {
  EditDisplayName,
  EditEmail,
  EditBiography,
  EditPrivacy,
  EditProfilePicture,
  EditBackgroundImage,
};
