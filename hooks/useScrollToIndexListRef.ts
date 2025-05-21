import { useCallback, useEffect, useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import useStore from '@/store';

/**
 * Hook to handle scrolling to and highlighting an answer from a notification
 * 
 * @param questionId - The ID of the current question
 * @returns Object containing the FlashList ref and functions to manage highlighting
 */
export const useNotificationScrollAndHighlight = (questionId: string) => {
  const listRef = useRef<FlashList<any>>(null);
  const { 
    highlightedAnswer, 
    markAnswerAsViewed, 
    resetHighlightState 
  } = useStore((state: any) => state);

  // Function to scroll to a specific answer
  const scrollToAnswer = useCallback((items: any[], answerId: string) => {
    if (!listRef.current) return;
    
    // Find the index of the answer in the list
    const answerIndex = items.findIndex(item => item.id === answerId);
    
    if (answerIndex !== -1) {
      // Scroll to the answer with animation
      listRef.current.scrollToIndex({
        index: answerIndex,
        animated: true,
        viewOffset: 100, // Add some space at the top
      });
      
      // Mark the answer as viewed to prevent re-scrolling
      markAnswerAsViewed(answerId);
    }
  }, [markAnswerAsViewed]);

  // Check if we should scroll to an answer when data changes
  const handleDataChange = useCallback((items: any[]) => {
    // Only scroll if we have a highlighted answer for this question that hasn't been scrolled to yet
    if (
      highlightedAnswer && 
      highlightedAnswer.questionId === questionId && 
      !highlightedAnswer.hasScrolled && 
      items?.length > 0
    ) {
      // Slight delay to ensure the list is fully rendered
      setTimeout(() => {
        scrollToAnswer(items, highlightedAnswer.answerId);
      }, 300);
    }
  }, [highlightedAnswer, questionId, scrollToAnswer]);

  // Clean up highlight state when unmounting
  useEffect(() => {
    return () => {
      // Only reset if the highlighted answer is for this question
      if (highlightedAnswer?.questionId === questionId) {
        resetHighlightState();
      }
    };
  }, [questionId, highlightedAnswer, resetHighlightState]);

  return {
    listRef,
    handleDataChange,
    isHighlighted: useCallback((answerId: string) => {
      return highlightedAnswer?.answerId === answerId;
    }, [highlightedAnswer]),
    scrollToAnswer
  };
};
