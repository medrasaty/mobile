import Text from "@/components/styled/Text";
import View from "@/components/styled/View";
import { ProfilePicture } from "@/components/Avatar";
import Username from "@/components/Username";
import UserVerificationBadge from "@/components/UserVerificationBadge";
import { BaseUser } from "@/types/user.types";

export const QuestionDetailOwner = ({ owner }: { owner: BaseUser }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <ProfilePicture size={44} source={owner.avatar_thumbnail} />
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Username
            name={owner.short_name}
            username={owner.username}
            variant="bodyMedium"
          />
          <UserVerificationBadge userType={owner.type} />
        </View>
        <Text style={{ color: "gray" }} variant="labelSmall">
          {owner.school_name}
        </Text>
      </View>
    </View>
  );
};

export default QuestionDetailOwner;
