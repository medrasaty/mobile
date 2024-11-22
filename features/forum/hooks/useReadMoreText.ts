import { useEffect, useState } from "react";

const MAX_LENGTH = 250;

type useReadMoreTextProps = {
  defaultText: string;
  max_length?: number;
  trailing?: string;
};

export default function useReadMoreText({
  defaultText,
  max_length = MAX_LENGTH,
  trailing = "...",
}: useReadMoreTextProps) {
  const [modifiedText, setModifiedText] = useState<string>("");
  const isOverFlow = defaultText.length > max_length;
  const [isReadMore, setIsReadMore] = useState(isOverFlow);

  useEffect(() => {
    if (isReadMore) {
      const newText = defaultText.slice(0, max_length) + trailing;
      setModifiedText(newText);
    } else {
      setModifiedText(defaultText);
    }
  }, [isReadMore, defaultText]);

  const toggleIsReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return { isReadMore, modifiedText, toggleIsReadMore, isOverFlow };
}
