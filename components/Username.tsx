import { router } from "expo-router";
import Text from "./styled/Text";
import { TextProps } from "react-native-paper";

// FIXME
type UsernameProps<T> = {
  username: string;
  name: string;
  children?: React.ReactNode;
} & Omit<TextProps<T>, "children">;

export default function Username<T>({ username, ...props }: UsernameProps<T>) {
  const handlePress = () => {
    // console.log(
    //   reverse({
    //     name: "user-detail",
    //     args: { username: username },
    //   })
    // );
    router.push("/users/" + username);
  };

  return (
    <Text {...props} onPress={handlePress}>
      {props.name}
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
