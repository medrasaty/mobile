import Text from "./styled/Text";
import { TextProps } from "react-native-paper";

// FIXME
interface UsernameProps extends TextProps<any> {
  username: string;
  name: string;
  children?: React.ReactNode;
}

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
