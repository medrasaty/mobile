import { Touchable, ViewProps } from "react-native";
import Text from "./styled/Text";
import View from "./styled/View";
import { TextProps } from "react-native-paper";
import { router } from "expo-router";

type UsernameProps = {
  username: string;
} & TextProps<any>;

export default function Username({ username, ...props }: UsernameProps) {
  const handlePress = () => {
    console.log(
      reverse({
        name: "user-detail",
        args: { username: username },
      })
    );
    // router.navigate(
    //     reverse("user-detail", { username: username })
    // );
  };

  return (
    <Text {...props} onPress={handlePress}>
      {props.children}
    </Text>
  );
}

function reverse({ name, args }: { name: string; args?: any }) {
  if (name === "user-detail") {
    if (!args?.username) {
      throw Error("you must pass username to args!");
    }
    return "/users/detail/" + args.username;
  }
}
