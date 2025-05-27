import { create } from "zustand";

type UserContentStore = {
    questionsSearchValue: string;
    answersSearchValue: string;
    updateQuestionsSearch:(value: string) => void
    updateAnswersSearch:(value: string) => void

};

export const useUserContentStore = create<UserContentStore>((set) => ({
    questionsSearchValue: "",
    answersSearchValue: "",
    updateAnswersSearch: (value) => {
        return set({answersSearchValue: value})
    },
    updateQuestionsSearch: (value) => {
        return set({questionsSearchValue: value})
    }
})
