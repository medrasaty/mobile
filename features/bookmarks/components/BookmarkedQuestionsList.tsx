import { memo } from "react";
import { AnimatedFlashList, FlashListProps } from "@shopify/flash-list";
import { BookmarkQuestion } from "../types";
import BookmarkQuestionCard, { BOOKMARK_QUESTION_CARD_HEIGHT } from "./BookmarkQuestionCard";
import { Divider } from "react-native-paper";
import Animated, { LinearTransition } from 'react-native-reanimated';

/**
 * A memoized list component for displaying bookmarked questions
 * Extracted to its own file to improve hot reload performance
 */
export const BookmarkedQuestionsList = memo(function BookmarkedQuestionsList({
  ...props
}: Omit<FlashListProps<BookmarkQuestion>, "renderItem">) {
  return (
    <AnimatedFlashList
      showsVerticalScrollIndicator={false}
      estimatedItemSize={BOOKMARK_QUESTION_CARD_HEIGHT}
      ItemSeparatorComponent={Divider}
      renderItem={({ item }: { item: BookmarkQuestion }) => (
        <Animated.View layout={LinearTransition}>
          <BookmarkQuestionCard question={item} />
        </Animated.View>
      )}
      {...props}
    />
  );
});
