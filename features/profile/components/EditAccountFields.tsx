import { ViewProps } from "react-native";
import View from "@components/styled/View";
import EditFieldSheet from "./EditFieldSheet";
import { useSheetRef } from "@components/Sheet";
import { t } from "i18next";
import { useAuthSession } from "@features/auth/store";
import { useState } from "react";
import EditField from "./EditField";
import { useUpdateUserProfileMutation } from "../mutations";
import { UpdateProfileData } from "../types";

type EditFieldProps = ViewProps & {};

/**
 * Component for editing the user's display name
 */
const EditDisplayName = ({ ...props }: EditFieldProps) => {
  const user = useAuthSession((state) => state.session?.user);
  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const sheetRef = useSheetRef();

  const { mutate: update, isPending } = useUpdateUserProfileMutation(user?.pk || "");

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

  const { mutate: update, isPending } = useUpdateUserProfileMutation(user?.pk || "");

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

  const { mutate: update, isPending } = useUpdateUserProfileMutation(user?.pk || "");

  const handleUpdate = async () => {
    update(
      { 
        profile: {
          biography,
        }
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
  const [isPrivate, setIsPrivate] = useState(user?.profile?.is_private || false);
  const sheetRef = useSheetRef();

  const { mutate: update, isPending } = useUpdateUserProfileMutation(user?.pk || "");

  const handleUpdate = async () => {
    update(
      { 
        profile: {
          is_private: isPrivate,
        }
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
        description={t("When your profile is private, only approved followers can see your posts and activity")}
      />
    </View>
  );
};

export { EditDisplayName, EditEmail, EditBiography, EditPrivacy };
