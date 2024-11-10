import { MotiSkeletonProps } from "moti/src/skeleton/types";
import { Skeleton as MotiSkeleton } from "moti/skeleton";
import { useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";

type SkeletonProps = Omit<MotiSkeletonProps, "Gradient">;

const Skeleton = ({ children, ...props }: SkeletonProps) => {
  const scheme = useColorScheme();
  const theme = useTheme();

  return (
    <MotiSkeleton
      // @ts-ignore
      colorMode={scheme}
      {...props}
    >
      {children}
    </MotiSkeleton>
  );
};

export default Skeleton;
