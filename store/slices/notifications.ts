interface NotificationDetails {
  type: "answer" | "reply" | "question";
  question: string;
  answer: string | null;
  reply: string | null;
}

interface HighlightInfo {
  answerId: string;
  questionId: string;
  hasScrolled: boolean;
  timestamp: number;
}

export interface NotificationSlice {
  notifications: Notification[];
  isNotificationActive: boolean;
  
  // Track the current active notification details
  activeNotificationDetails: NotificationDetails | undefined;
  setActiveNotificationDetails: (details: NotificationDetails | undefined) => void;
  
  // Track highlighting state
  highlightedAnswer: HighlightInfo | null;
  setHighlightedAnswer: (info: HighlightInfo | null) => void;
  
  // Mark that we've already scrolled to a specific answer
  markAnswerAsViewed: (answerId: string) => void;
  
  // Reset highlight state
  resetHighlightState: () => void;
}

export const createNotificationSlice = (set: any, get: any): NotificationSlice => ({
  notifications: [],
  isNotificationActive: false,
  
  activeNotificationDetails: undefined,
  setActiveNotificationDetails: (details) => {
    set((state: NotificationSlice) => ({
      ...state,
      activeNotificationDetails: details,
      // Clear highlight state when setting new notification details
      ...(details?.answer && {
        highlightedAnswer: {
          answerId: details.answer,
          questionId: details.question,
          hasScrolled: false,
          timestamp: Date.now()
        }
      })
    }));
  },
  
  // Track which answer should be highlighted and if we've scrolled to it
  highlightedAnswer: null,
  setHighlightedAnswer: (info) => {
    set((state: NotificationSlice) => ({
      ...state,
      highlightedAnswer: info
    }));
  },
  
  // Mark that we've scrolled to an answer
  markAnswerAsViewed: (answerId) => {
    set((state: NotificationSlice) => {
      if (state.highlightedAnswer?.answerId === answerId) {
        return {
          ...state,
          highlightedAnswer: {
            ...state.highlightedAnswer,
            hasScrolled: true
          }
        };
      }
      return state;
    });
  },
  
  // Reset the highlight state completely
  resetHighlightState: () => {
    set((state: NotificationSlice) => ({
      ...state,
      highlightedAnswer: null,
      activeNotificationDetails: undefined
    }));
  }
});
