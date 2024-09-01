import Loader from "@/components/Loader";
import { Rect, Circle } from "react-content-loader/native";

export default function ReplyCardSkeleton() {
  const Skeleton = () => {
    return (
      <>
        <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <Rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <Rect x="1" y="73" rx="3" ry="3" width="107" height="4" />
        <Circle cx="20" cy="20" r="20" />
      </>
    );
  };

  const Skeletons = [1, 3, 4, 5].map((index) => {
    return <Skeleton key={index} />;
  });

  return <Loader>{Skeletons}</Loader>;
}
