import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [answerId, setAnswerId] = useState<string | null>(null);
  
  // Extract only what we need from the store to minimize rerenders
  const highlightedAnswer = useStore(
    useCallback((state: any) => 
      state.highlightedAnswer?.questionId === questionId ? state.highlightedAnswer : null, 
      [questionId]
    )
  );
  
  const markAnswerAsViewed = useStore(
    useCallback((state: any) => state.markAnswerAsViewed, [])
  );
  
  const resetHighlightState = useStore(
    useCallback((state: any) => state.resetHighlightState, [])
  );

  // Set answerId only once when highlightedAnswer changes to avoid rerenders
  useEffect(() => {
    if (highlightedAnswer?.answerId && !highlightedAnswer.hasScrolled) {
      setAnswerId(highlightedAnswer.answerId);
    }
  }, [highlightedAnswer]);

  // Function to scroll to a specific answer with better performance
  const scrollToAnswer = useCallback((items: any[], targetAnswerId: string) => {
    if (!listRef.current || !targetAnswerId) return;
    
    // Find the index of the answer in the list
    const answerIndex = items.findIndex(item => item.id === targetAnswerId);
    
    if (answerIndex !== -1) {
      // Use requestAnimationFrame to delay scrolling until after render
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({
          index: answerIndex,
          animated: true,
          viewOffset: 100, // Add some space at the top
        });
        
        // Mark the answer as viewed to prevent re-scrolling
        markAnswerAsViewed(targetAnswerId);
        
        // Clear the local answerId to prevent further attempts
        setAnswerId(null);
      });
    }
  }, [markAnswerAsViewed]);

  // Check if we should scroll to an answer when data changes
  const handleDataChange = useCallback((items: any[]) => {
    // Only scroll if we have an answer ID to scroll to and items have loaded
    if (answerId && items?.length > 0) {
      // Use a timeout to give the rendering a chance to complete
      setTimeout(() => {
        scrollToAnswer(items, answerId);
      }, 300);
    }
  }, [answerId, scrollToAnswer]);

  // Clean up highlight state when unmounting
  useEffect(() => {
    return () => {
      if (highlightedAnswer?.questionId === questionId) {
        resetHighlightState();
      }
    };
  }, [questionId, highlightedAnswer, resetHighlightState]);

  return {
    listRef,
    handleDataChange,
    isHighlighted: useCallback((id: string) => id === answerId, [answerId])
  };
};
