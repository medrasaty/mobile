import View from "@/components/styled/View";
import { ViewProps, useColorScheme } from "react-native";
import FastImage from "react-native-fast-image";

const MedrasatyLogo = ({ style, ...props }: ViewProps) => {
  const dark_logo = require(`@/assets/images/logo_dark.png`);
  const light_logo = require(`@/assets/images/logo_light.png`);

  const colorscheme = useColorScheme();

  return (
    <View style={[style]} {...props}>
      <FastImage 
        source={colorscheme === "dark" ? dark_logo : light_logo}
        resizeMode={FastImage.resizeMode.contain}
        style={{ width: 200, height: 100 }}

      />
    </View>
  );
};

export default MedrasatyLogo;
