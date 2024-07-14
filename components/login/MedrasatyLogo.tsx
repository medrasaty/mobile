import View from "@/components/styled/View";
import { Image } from "expo-image";
import { useColorScheme } from "react-native";

const MedrasatyLogo = () => {
  const dark_logo = require(`@/assets/images/logo_dark.png`);
  const light_logo = require(`@/assets/images/logo_light.png`);

  const colorscheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={colorscheme === "dark" ? dark_logo : light_logo}
        contentFit="contain"
        style={{ width: 200, height: 100 }}
      />
    </View>
  );
};

export default MedrasatyLogo;
